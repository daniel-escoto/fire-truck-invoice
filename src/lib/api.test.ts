import { extractUUID, getListing, handleApiError } from "./api";

global.fetch = jest.fn();

describe("extractUUID", () => {
  it("should extract a valid UUID from a URL", () => {
    const url =
      "https://www.withgarage.com/listing/2003-Ford-F550-Rescue-fdd3f8c6-5d79-4dac-af01-48bb0a1e61f9";
    const result = extractUUID(url);
    expect(result).toBe("fdd3f8c6-5d79-4dac-af01-48bb0a1e61f9");
  });

  it("should return null if no UUID is found", () => {
    const url = "https://www.withgarage.com/listing/invalid-url";
    const result = extractUUID(url);
    expect(result).toBeNull();
  });
});

describe("getListing", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch listing data successfully", async () => {
    const mockResponse = {
      result: {
        listing: { id: "uuid-123", listingTitle: "Test Listing" },
      },
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await getListing("uuid-123");

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/getListing`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: "uuid-123" }),
      })
    );

    expect(result).toEqual(mockResponse);
  });

  it("should throw an error on non-OK response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(getListing("uuid-123")).rejects.toThrow("Error: 500");
  });

  it("should handle network errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

    await expect(getListing("uuid-123")).rejects.toThrow("Network Error");
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
