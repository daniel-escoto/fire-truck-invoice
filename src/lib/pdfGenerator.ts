import jsPDF from "jspdf";
import { GetListingResponse } from "@/lib/types";

/**
 * Converts an image URL to Base64.
 * @param imagePath - Path to the image.
 */
async function loadImageAsBase64(imagePath: string): Promise<string> {
  try {
    const response = await fetch(imagePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error loading image as Base64:", error);
    throw error;
  }
}

/**
 * Generates a PDF invoice as a data URI.
 * @param data - Listing response data.
 * @param buyerName - Name of the buyer.
 * @param buyerEmail - Email of the buyer.
 * @returns Data URI of the generated PDF.
 */
export async function generateInvoicePDF(
  data: GetListingResponse,
  buyerName: string,
  buyerEmail: string
): Promise<string> {
  const doc = new jsPDF();

  // Add Logo
  try {
    const logoBase64 = await loadImageAsBase64(
      `${window.location.origin}/images/garage-logo.png`
    );
    doc.addImage(logoBase64, "PNG", 20, 10, 50, 20); // x, y, width, height
  } catch {
    console.warn("Failed to load logo image. Continuing without logo.");
  }

  // Invoice Header
  doc.setFontSize(20).text("Invoice", 105, 40, { align: "center" });
  doc.setFontSize(12);
  doc.line(20, 45, 190, 45); // Horizontal line under title

  // Buyer Details
  doc.setFontSize(14).text("Buyer Information:", 20, 55);
  doc.setFontSize(12);
  doc.text(`Name: ${buyerName}`, 20, 65);
  doc.text(`Email: ${buyerEmail}`, 20, 75);

  // Listing Details
  doc.setFontSize(14).text("Listing Details:", 20, 90);
  doc.setFontSize(12);
  doc.text(`Title: ${data.result.listing.listingTitle}`, 20, 100);
  doc.text(`Price: $${data.result.listing.sellingPrice}`, 20, 110);
  doc.text(
    `Location: ${data.result.listing.addressCity}, ${data.result.listing.addressState}`,
    20,
    120
  );
  doc.text(`Mileage: ${data.result.listing.mileage} miles`, 20, 130);

  // Footer
  doc.line(20, 260, 190, 260); // Horizontal line at footer
  doc.setFontSize(10).text("Thank you for your business!", 105, 270, {
    align: "center",
  });

  return doc.output("datauristring");
}

/**
 * Downloads a PDF invoice directly.
 * @param data - Listing response data.
 * @param buyerName - Name of the buyer.
 * @param buyerEmail - Email of the buyer.
 */
export async function downloadInvoicePDF(
  data: GetListingResponse,
  buyerName: string,
  buyerEmail: string
): Promise<void> {
  const doc = new jsPDF();

  // Add Logo
  try {
    const logoBase64 = await loadImageAsBase64(
      `${window.location.origin}/images/garage-logo.png`
    );
    doc.addImage(logoBase64, "PNG", 20, 10, 50, 20); // x, y, width, height
  } catch {
    console.warn("Failed to load logo image. Continuing without logo.");
  }

  // Invoice Header
  doc.setFontSize(20).text("Invoice", 105, 40, { align: "center" });
  doc.setFontSize(12);
  doc.line(20, 45, 190, 45); // Horizontal line under title

  // Buyer Details
  doc.setFontSize(14).text("Buyer Information:", 20, 55);
  doc.setFontSize(12);
  doc.text(`Name: ${buyerName}`, 20, 65);
  doc.text(`Email: ${buyerEmail}`, 20, 75);

  // Listing Details
  doc.setFontSize(14).text("Listing Details:", 20, 90);
  doc.setFontSize(12);
  doc.text(`Title: ${data.result.listing.listingTitle}`, 20, 100);
  doc.text(`Price: $${data.result.listing.sellingPrice}`, 20, 110);
  doc.text(
    `Location: ${data.result.listing.addressCity}, ${data.result.listing.addressState}`,
    20,
    120
  );
  doc.text(`Mileage: ${data.result.listing.mileage} miles`, 20, 130);

  // Footer
  doc.line(20, 260, 190, 260); // Horizontal line at footer
  doc.setFontSize(10).text("Thank you for your business!", 105, 270, {
    align: "center",
  });

  // Trigger Download
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "invoice.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(pdfUrl);
}
