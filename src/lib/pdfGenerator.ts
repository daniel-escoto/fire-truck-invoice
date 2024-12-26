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
 * Generates a PDF as a data URI.
 * @param data - Listing response data.
 * @returns Data URI of the generated PDF.
 */
export async function generateInvoicePDF(
  data: GetListingResponse
): Promise<string> {
  const doc = new jsPDF();

  const logoBase64 = await loadImageAsBase64(
    `${window.location.origin}/images/garage-logo.png`
  );
  if (!logoBase64) {
    console.error("Failed to load the image as base64");
    throw new Error("Failed to load the logo image");
  }

  doc.addImage(logoBase64, "PNG", 20, 10, 50, 20);

  doc.setFontSize(20).text("Invoice", 105, 40, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Listing Title: ${data.result.listing.listingTitle}`, 20, 60);
  doc.text(`Price: $${data.result.listing.sellingPrice}`, 20, 70);
  doc.text(
    `Location: ${data.result.listing.addressCity}, ${data.result.listing.addressState}`,
    20,
    80
  );
  doc.text(`Mileage: ${data.result.listing.mileage} miles`, 20, 90);
  doc.text("Thank you for your business!", 105, 110, { align: "center" });

  return doc.output("datauristring");
}

/**
 * Downloads a PDF invoice directly.
 * @param data - Listing response data.
 */
export async function downloadInvoicePDF(
  data: GetListingResponse
): Promise<void> {
  const doc = new jsPDF();

  const logoBase64 = await loadImageAsBase64(
    `${window.location.origin}/images/garage-logo.png`
  );
  if (!logoBase64) {
    console.error("Failed to load the image as base64");
    throw new Error("Failed to load the logo image");
  }

  doc.addImage(logoBase64, "PNG", 20, 10, 50, 20);

  doc.setFontSize(20).text("Invoice", 105, 40, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Listing Title: ${data.result.listing.listingTitle}`, 20, 60);
  doc.text(`Price: $${data.result.listing.sellingPrice}`, 20, 70);
  doc.text(
    `Location: ${data.result.listing.addressCity}, ${data.result.listing.addressState}`,
    20,
    80
  );
  doc.text(`Mileage: ${data.result.listing.mileage} miles`, 20, 90);
  doc.text("Thank you for your business!", 105, 110, { align: "center" });

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
