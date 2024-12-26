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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const fetchedData = await fetchInvoiceData(link);
      const pdfUri = generateInvoicePDF(fetchedData);
      setPdfDataUri(pdfUri);
      setIsModalOpen(true);
    } catch {
      console.error("Failed to fetch or generate PDF");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <Header />
      <InvoiceForm
        link={link}
        setLink={setLink}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      {error && <ErrorMessage message={error} />}
      {isModalOpen && pdfDataUri && data && (
        <InvoiceModal
          pdfDataUri={pdfDataUri}
          onDownload={() => downloadInvoicePDF(data)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
