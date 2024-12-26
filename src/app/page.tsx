"use client";

import { useState } from "react";
import Header from "@/components/Header";
import InvoiceForm from "@/components/InvoiceForm";
import ErrorMessage from "@/components/ErrorMessage";
import InvoiceModal from "@/components/InvoiceModal";
import { extractUUID, getListing } from "@/lib/api";
import { GetListingResponse } from "@/lib/types";
import jsPDF from "jspdf";

export default function Home() {
  const [response, setResponse] = useState<GetListingResponse | null>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (link: string) => {
    setResponse(null);
    setIsError(false);
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const uuid = extractUUID(link);
      if (!uuid) {
        throw new Error("Invalid URL: No valid UUID found.");
      }

      const data: GetListingResponse = await getListing(uuid);
      setResponse(data);

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

      setPdfDataUri(doc.output("datauristring"));
      setIsModalOpen(true);
    } catch (error: unknown) {
      setResponse(null);
      setIsError(true);

      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.error("Error:", error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
        console.error("Unknown Error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!response) return;

    const doc = new jsPDF();
    doc.setFontSize(20).text("Invoice", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Listing Title: ${response.result.listing.listingTitle}`, 20, 40);
    doc.text(`Price: $${response.result.listing.sellingPrice}`, 20, 50);
    doc.text(
      `Location: ${response.result.listing.addressCity}, ${response.result.listing.addressState}`,
      20,
      60
    );
    doc.text(`Mileage: ${response.result.listing.mileage} miles`, 20, 70);
    doc.text("Thank you for your business!", 105, 90, { align: "center" });

    doc.save("invoice.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <Header />
      <InvoiceForm onSubmit={handleSubmit} isLoading={isLoading} />
      {isError && errorMessage && <ErrorMessage message={errorMessage} />}
      {isModalOpen && pdfDataUri && (
        <InvoiceModal
          pdfDataUri={pdfDataUri}
          onDownload={downloadPDF}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
