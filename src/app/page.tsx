"use client";

import { useState } from "react";
import Header from "@/components/Header";
import InvoiceForm from "@/components/InvoiceForm";
import ErrorMessage from "@/components/ErrorMessage";
import InvoiceModal from "@/components/InvoiceModal";
import { useInvoice } from "@/hooks/useInvoice";
import { generateInvoicePDF, downloadInvoicePDF } from "@/lib/pdfGenerator";

export default function Home() {
  const { data, error, isLoading, fetchInvoiceData } = useInvoice();
  const [link, setLink] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const fetchedData = await fetchInvoiceData(link);
      const pdfUri = await generateInvoicePDF(
        fetchedData,
        buyerName,
        buyerEmail
      );

      // Convert Data URI to Blob URL
      const byteString = atob(pdfUri.split(",")[1]);
      const mimeString = pdfUri.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const blobUrl = URL.createObjectURL(blob);

      setPdfDataUri(blobUrl);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch or generate PDF", error);
    }
  };

  const handleDownload = async () => {
    if (!data) return;
    try {
      await downloadInvoicePDF(data, buyerName, buyerEmail);
    } catch (error) {
      console.error("Failed to download PDF:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <Header />
      <InvoiceForm
        link={link}
        setLink={setLink}
        buyerName={buyerName}
        setBuyerName={setBuyerName}
        buyerEmail={buyerEmail}
        setBuyerEmail={setBuyerEmail}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      {error && <ErrorMessage message={error} />}
      {isModalOpen && pdfDataUri && data && (
        <InvoiceModal
          pdfDataUri={pdfDataUri}
          onDownload={handleDownload}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
