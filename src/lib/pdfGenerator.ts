import jsPDF from "jspdf";
import { GetListingResponse } from "@/lib/types";

/**
 * Generates a PDF as a data URI.
 * @param data - Listing response data.
 * @returns Data URI of the generated PDF.
 */
export function generateInvoicePDF(data: GetListingResponse): string {
  const doc = new jsPDF();

  doc.setFontSize(20).text("Invoice", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Listing Title: ${data.result.listing.listingTitle}`, 20, 40);
  doc.text(`Price: $${data.result.listing.sellingPrice}`, 20, 50);
  doc.text(
    `Location: ${data.result.listing.addressCity}, ${data.result.listing.addressState}`,
    20,
    60
  );
  doc.text(`Mileage: ${data.result.listing.mileage} miles`, 20, 70);
  doc.text("Thank you for your business!", 105, 90, { align: "center" });

  return doc.output("datauristring");
}

/**
 * Downloads a PDF invoice.
 * @param data - Listing response data.
 */
export function downloadInvoicePDF(data: GetListingResponse): void {
  const doc = new jsPDF();

  doc.setFontSize(20).text("Invoice", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Listing Title: ${data.result.listing.listingTitle}`, 20, 40);
  doc.text(`Price: $${data.result.listing.sellingPrice}`, 20, 50);
  doc.text(
    `Location: ${data.result.listing.addressCity}, ${data.result.listing.addressState}`,
    20,
    60
  );
  doc.text(`Mileage: ${data.result.listing.mileage} miles`, 20, 70);
  doc.text("Thank you for your business!", 105, 90, { align: "center" });

  doc.save("invoice.pdf");
}
