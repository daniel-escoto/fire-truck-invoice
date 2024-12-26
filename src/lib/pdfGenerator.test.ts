import { generateInvoicePDF } from "./pdfGenerator";
import { GetListingResponse } from "@/lib/types";

// Mock fetch globally for loading the image
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    blob: () =>
      Promise.resolve(
        new Blob(
          [
            atob(
              "iVBORw0KGgoAAAANSUhEUgAAAAUA" +
                "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                "//8/w38GIAXDIBKE0DHxgljNBAAO" +
                "9TXL0Y4OHwAAAABJRU5ErkJggg=="
            ),
          ],
          { type: "image/png" }
        )
      ),
  })
) as jest.Mock;

// Mock FileReader globally
class FileReaderMock {
  result: string | null = null;
  onloadend: (() => void) | null = null;
  onerror: (() => void) | null = null;

  readAsDataURL() {
    this.result =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
      "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
      "//8/w38GIAXDIBKE0DHxgljNBAAO" +
      "9TXL0Y4OHwAAAABJRU5ErkJggg==";
    if (this.onloadend) this.onloadend();
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).FileReader = FileReaderMock;

describe("pdfGenerator", () => {
  const mockData: GetListingResponse = {
    result: {
      listing: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        createdAt: "2024-01-01T12:00:00Z",
        updatedAt: "2024-01-02T12:00:00Z",
        listingTitle: "Test Listing",
        sellingPrice: 1000,
        addressCity: "Test City",
        addressState: "Test State",
        mileage: 5000,
        imageUrls: [],
        listingStatus: 0,
        tags: [],
        categories: [],
        itemBrand: "Test Brand",
        listingDescription: "A sample test listing description.",
        itemAge: 2023,
        itemLength: 0,
        itemWidth: 0,
        itemHeight: 0,
        itemWeight: 0,
        addressPrimary: "123 Test St",
        addressSecondary: "",
        addressZip: "12345",
        hasServiceRecords: true,
        hasRust: false,
        isFourWheelDrive: false,
        tankSize: null,
        pumpSize: null,
        hasPumpTest: false,
        aerialLength: null,
        isAuction: false,
        expirationDate: null,
        finalPrice: null,
        vin: null,
        userId: "user-123",
        user: {
          id: "user-123",
          email: "test@example.com",
        },
      },
    },
    error: "",
  };

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).window = { location: { origin: "http://localhost:3000" } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate a valid PDF data URI", async () => {
    const pdfUri = await generateInvoicePDF(mockData);
    expect(pdfUri).toMatch(/^data:application\/pdf(;filename=.+)?;base64,/);
  });

  it("should throw an error if the image fails to load", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: "Failed to fetch",
      })
    );

    await expect(generateInvoicePDF(mockData)).rejects.toThrow(
      "Failed to fetch image: Failed to fetch"
    );
  });
});
