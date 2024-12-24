// src/lib/api.test.ts

import { fetchData, handleApiError, ApiResponse } from "./api";

global.fetch = jest.fn();

describe("fetchData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data successfully", async () => {
    const mockResponse: ApiResponse = { message: "Success", success: true };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await fetchData("http://example.com");

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/process-link`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: "http://example.com" }),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error on non-OK response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(fetchData("http://example.com")).rejects.toThrow("Error: 500");
  });

  it("should handle network errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

    await expect(fetchData("http://example.com")).rejects.toThrow(
      "Network Error"
    );
  });
});

describe("handleApiError", () => {
  it("should handle Error instances correctly", () => {
    expect(() => handleApiError(new Error("Test Error"))).toThrow("Test Error");
  });

  it("should handle string errors correctly", () => {
    expect(() => handleApiError("String Error")).toThrow("String Error");
  });

  it("should handle unknown errors correctly", () => {
    expect(() => handleApiError({})).toThrow("An unknown error occurred");
  });
});
