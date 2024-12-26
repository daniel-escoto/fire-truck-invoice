import { generateInvoicePDF } from "./pdfGenerator";
import { GetListingResponse } from "@/lib/types";

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

  it("should generate a valid PDF data URI", () => {
    const pdfUri = generateInvoicePDF(mockData);
    expect(pdfUri).toMatch(/^data:application\/pdf(;filename=.+)?;base64,/);
  });
});
