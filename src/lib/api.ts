export interface ApiResponse {
  message: string;
  success: boolean;
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
