"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { extractUUID, getListing } from "@/lib/api";
import { GetListingResponse } from "@/lib/types";
import jsPDF from "jspdf";

export default function Home() {
  const [link, setLink] = useState("");
  const [response, setResponse] = useState<GetListingResponse | null>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
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
      } else if (typeof error === "string") {
        setErrorMessage(error);
        console.error("Error:", error);
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
      <div className="flex flex-col gap-4 items-center w-full max-w-md">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Paste a link"
          className="w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        <Button onClick={handleSubmit} disabled={!link.trim() || isLoading}>
          {isLoading ? "Generating..." : "Generate Invoice"}
        </Button>
      </div>
      {isError && errorMessage && (
        <p className="text-red-500 mt-4">{errorMessage}</p>
      )}
      {isModalOpen && pdfDataUri && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <iframe src={pdfDataUri} className="w-full h-96" />
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={downloadPDF}>Download PDF</Button>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
