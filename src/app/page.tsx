"use client";

import { useState } from "react";
import Header from "@/components/Header";
import InvoiceForm from "@/components/InvoiceForm";
import ErrorMessage from "@/components/ErrorMessage";
import InvoiceModal from "@/components/InvoiceModal";
import Footer from "@/components/Footer";
import { useInvoice } from "@/hooks/useInvoice";

export default function Home() {
  const { data, error, isLoading, fetchInvoiceData } = useInvoice();
  const [link, setLink] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await fetchInvoiceData(link);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch invoice data", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex flex-col items-center justify-center flex-grow gap-8 p-8">
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
        {data && (
          <InvoiceModal
            data={data}
            buyerName={buyerName}
            buyerEmail={buyerEmail}
            onClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
            link={link}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
