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
 * Creates the header section of the invoice PDF.
 * @param doc - The jsPDF document instance.
 * @param data - Listing response data.
 */
async function createHeader(doc: jsPDF, data: GetListingResponse) {
  try {
    const logoBase64 = await loadImageAsBase64(
      `${window.location.origin}/images/garage-logo.png`
    );
    doc.addImage(logoBase64, "PNG", 20, 10, 50, 20);
  } catch {
    console.warn("Failed to load logo image. Continuing without logo.");
  }

  doc.setFontSize(20).text("Invoice", 105, 40, { align: "center" });
  doc.setFontSize(12);
  doc.line(20, 45, 190, 45);

  if (data.result.listing.imageUrls.length > 0) {
    try {
      const listingImageBase64 = await loadImageAsBase64(
        data.result.listing.imageUrls[0]
      );
      doc.addImage(listingImageBase64, "JPEG", 20, 50, 170, 90);
    } catch {
      console.warn("Failed to load listing image. Continuing without image.");
    }
  }
}

/**
 * Creates the buyer and seller section of the invoice PDF.
 * @param doc - The jsPDF document instance.
 * @param buyerName - Name of the buyer.
 * @param buyerEmail - Email of the buyer.
 * @param sellerEmail - Email of the seller.
 */
function createBuyerSellerSection(
  doc: jsPDF,
  buyerName: string,
  buyerEmail: string,
  sellerEmail: string
) {
  doc.setFontSize(14).text("Buyer Information:", 20, 145);
  doc.setFontSize(12);
  doc.text(`Name: ${buyerName}`, 20, 155);
  doc.text(`Email: ${buyerEmail}`, 20, 165);

  doc.setFontSize(14).text("Seller Information:", 20, 180);
  doc.setFontSize(12);
  doc.text(`Email: ${sellerEmail}`, 20, 190);
}

/**
 * Creates the listing details section of the invoice PDF.
 * @param doc - The jsPDF document instance.
 * @param data - Listing response data.
 */
function createListingDetailsSection(doc: jsPDF, data: GetListingResponse) {
  doc.setFontSize(14).text("Listing Details:", 20, 210);
  doc.setFontSize(12);

  const listing = data.result.listing;

  doc.text(`Title: ${listing.listingTitle}`, 20, 220);
  doc.text(`Price: $${listing.sellingPrice}`, 20, 230);
  doc.text(`Brand: ${listing.itemBrand}`, 20, 240);
  doc.text(
    `Location: ${listing.addressCity}, ${listing.addressState}`,
    20,
    250
  );
  doc.text(`Mileage: ${listing.mileage} miles`, 20, 260);
  doc.text(`VIN: ${listing.vin || "N/A"}`, 20, 270);
  doc.text(
    `Description: ${listing.listingDescription || "No description provided."}`,
    20,
    280,
    { maxWidth: 170 }
  );
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

  await createHeader(doc, data); // 📝 Header Section
  createBuyerSellerSection(
    doc,
    buyerName,
    buyerEmail,
    data.result.listing.user.email
  ); // 🧑 Buyer & Seller Section
  createListingDetailsSection(doc, data); // 📋 Listing Details Section

  // 📌 **Footer**
  doc.line(20, 290, 190, 290); // Horizontal line at footer
  doc.setFontSize(10).text("Thank you for your business!", 105, 300, {
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
  const pdfDataUri = await generateInvoicePDF(data, buyerName, buyerEmail);
  const byteString = atob(pdfDataUri.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: "application/pdf" });
  const pdfUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "invoice.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(pdfUrl);
}
