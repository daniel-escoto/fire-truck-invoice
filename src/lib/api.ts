export interface ApiResponse {
  message: string;
  success: boolean;
}

export interface ListingResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  listingTitle: string;
  sellingPrice: number;
  imageUrls: string[];
  listingStatus: number;
  tags: string[];
  categories: number[];
  itemBrand: string;
  listingDescription: string;
  itemAge: number;
  itemLength: number;
  itemWidth: number;
  itemHeight: number;
  itemWeight: number;
  addressPrimary: string;
  addressSecondary: string;
  addressCity: string;
  addressZip: string;
  addressState: string;
  mileage: number;
  hasServiceRecords: boolean;
  hasRust: boolean;
  isFourWheelDrive: boolean | null;
  tankSize: number | null;
}

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

/**
 * Extracts UUID from a URL string.
 * @param url The URL string containing the UUID.
 * @returns The extracted UUID or null if not found.
 */
export function extractUUID(url: string): string | null {
  const parts = url.split("/");
  const candidate = parts.pop() || ""; // Get the last segment of the URL

  return UUID_REGEX.test(candidate) ? candidate : null;
}

/**
 * Fetches listing data by UUID.
 * @param uuid The UUID of the listing.
 * @returns The listing data.
 */
export async function getListing(
  uuid: string
): Promise<{ result: { listing: ListingResponse } }> {
  if (!UUID_REGEX.test(uuid)) {
    throw new Error("Invalid UUID provided");
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(`${apiUrl}/getListing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: uuid }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: { result: { listing: ListingResponse } } =
      await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
  }
}

export function handleApiError(error: unknown): never {
  if (error instanceof Error) {
    console.error("API Error:", error.message);
    throw new Error(error.message);
  } else if (typeof error === "string") {
    console.error("API Error:", error);
    throw new Error(error);
  } else {
    console.error("An unknown error occurred:", error);
    throw new Error("An unknown error occurred");
  }
}

export async function fetchData(link: string): Promise<ApiResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(`${apiUrl}/process-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error: unknown) {
    handleApiError(error);
  }
}
