import { GetListingResponse } from "./types";

export function extractUUID(url: string): string | null {
  const UUID_REGEX =
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

  const match = url.match(UUID_REGEX);
  return match ? match[0] : null;
}

export async function getListing(uuid: string): Promise<GetListingResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(`${apiUrl}/getListing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: uuid }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: GetListingResponse = await response.json();
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
