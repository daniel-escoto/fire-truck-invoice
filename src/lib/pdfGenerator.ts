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
 * Adds text with pagination support.
 * @param doc - jsPDF instance.
 * @param text - Text to render.
 * @param x - Horizontal position.
 * @param y - Vertical position.
 * @param maxWidth - Max width of text.
 * @returns Updated vertical position.
 */
function addTextWithPagination(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number = 170
): number {
  const pageHeight = doc.internal.pageSize.height;
  const textHeight = doc.getTextDimensions(text, { maxWidth }).h;
  const margin = 10;

  if (y + textHeight > pageHeight - margin) {
    doc.addPage();
    y = margin;
  }

  doc.text(text, x, y, { maxWidth });
  return y + textHeight + 5;
}

/**
 * Creates the header section of the invoice PDF.
 * @param doc - jsPDF instance.
 * @param data - Listing response data.
 */
async function createHeader(doc: jsPDF, data: GetListingResponse) {
  // Logo
  try {
    const logoBase64 = await loadImageAsBase64(
      `${window.location.origin}/images/garage-logo.png`
    );
    doc.addImage(logoBase64, "PNG", 20, 10, 30, 15); // Smaller logo
  } catch {
    console.warn("Failed to load logo image. Continuing without logo.");
  }

  // Title
  doc.setFontSize(22).text("Invoice", 105, 30, { align: "center" });
  doc.line(20, 35, 190, 35);

  // Listing Image
  if (data.result.listing.imageUrls.length > 0) {
    try {
      const listingImageBase64 = await loadImageAsBase64(
        data.result.listing.imageUrls[0]
      );
      doc.addImage(listingImageBase64, "JPEG", 20, 40, 80, 50); // Smaller listing image
    } catch {
      console.warn("Failed to load listing image. Continuing without image.");
    }
  }

  doc.line(20, 95, 190, 95);
}

/**
 * Creates the buyer and seller section.
 * @param doc - jsPDF instance.
 * @param buyerName - Buyer name.
 * @param buyerEmail - Buyer email.
 * @param sellerEmail - Seller email.
 * @param sellerAddress - Seller address details.
 */
function createBuyerSellerSection(
  doc: jsPDF,
  buyerName: string,
  buyerEmail: string,
  sellerEmail: string,
  sellerAddress: {
    addressPrimary: string;
    addressSecondary: string;
    addressCity: string;
    addressState: string;
    addressZip: string;
  }
) {
  let y = 100;

  // Buyer Information
  doc.setFontSize(14).text("Buyer Information:", 20, y);
  y += 10;
  y = addTextWithPagination(doc, `Name: ${buyerName}`, 20, y);
  y = addTextWithPagination(doc, `Email: ${buyerEmail}`, 20, y);

  // Seller Information
  y += 10;
  doc.setFontSize(14).text("Seller Information:", 120, 100);
  doc.setFontSize(12);
  y = addTextWithPagination(doc, `Email: ${sellerEmail}`, 120, 110);
  y = addTextWithPagination(
    doc,
    `Address: ${sellerAddress.addressPrimary}`,
    120,
    y
  );
  if (sellerAddress.addressSecondary) {
    y = addTextWithPagination(doc, `${sellerAddress.addressSecondary}`, 120, y);
  }
  y = addTextWithPagination(
    doc,
    `${sellerAddress.addressCity}, ${sellerAddress.addressState} ${sellerAddress.addressZip}`,
    120,
    y
  );
}

/**
 * Creates the listing details section.
 * @param doc - jsPDF instance.
 * @param data - Listing response data.
 */
function createListingDetailsSection(doc: jsPDF, data: GetListingResponse) {
  let y = 160;

  doc.setFontSize(14).text("Listing Details:", 20, y);
  y += 10;

  const listing = data.result.listing;
  y = addTextWithPagination(doc, `Title: ${listing.listingTitle}`, 20, y);
  y = addTextWithPagination(doc, `Price: $${listing.sellingPrice}`, 20, y);
  y = addTextWithPagination(doc, `Brand: ${listing.itemBrand}`, 20, y);
  y = addTextWithPagination(
    doc,
    `Location: ${listing.addressCity}, ${listing.addressState}`,
    20,
    y
  );
  y = addTextWithPagination(doc, `Mileage: ${listing.mileage} miles`, 20, y);
  y = addTextWithPagination(doc, `VIN: ${listing.vin || "N/A"}`, 20, y);
  y = addTextWithPagination(
    doc,
    `Description: ${listing.listingDescription || "No description provided."}`,
    20,
    y
  );
}

/**
 * Creates the footer section.
 * @param doc - jsPDF instance.
 */
function createFooter(doc: jsPDF) {
  const pageHeight = doc.internal.pageSize.height;
  doc.line(20, pageHeight - 20, 190, pageHeight - 20);
  doc
    .setFontSize(10)
    .text("Thank you for your business!", 105, pageHeight - 10, {
      align: "center",
    });
}

/**
 * Generates a PDF invoice.
 */
export async function generateInvoicePDF(
  data: GetListingResponse,
  buyerName: string,
  buyerEmail: string
): Promise<string> {
  const doc = new jsPDF();

  await createHeader(doc, data);
  createBuyerSellerSection(
    doc,
    buyerName,
    buyerEmail,
    data.result.listing.user.email,
    {
      addressPrimary: data.result.listing.addressPrimary,
      addressSecondary: data.result.listing.addressSecondary,
      addressCity: data.result.listing.addressCity,
      addressState: data.result.listing.addressState,
      addressZip: data.result.listing.addressZip,
    }
  );
  createListingDetailsSection(doc, data);
  createFooter(doc);

  return doc.output("datauristring");
}

/**
 * Downloads a PDF invoice directly.
 * @param data - Listing response data.
 * @param buyerName - Buyer name.
 * @param buyerEmail - Buyer email.
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
