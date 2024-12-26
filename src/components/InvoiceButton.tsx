"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { GetListingResponse } from "@/lib/types";

interface InvoiceButtonProps {
  data: GetListingResponse;
}

export default function InvoiceButton({ data }: InvoiceButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Invoice", 105, 20, { align: "center" });
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

    const pdfUri = doc.output("datauristring");
    setPdfDataUri(pdfUri);
    setIsModalOpen(true);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Invoice", 105, 20, { align: "center" });
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
  };

  return (
    <>
      <Button onClick={generatePDF}>Preview Invoice PDF</Button>
      {isModalOpen && pdfDataUri && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <iframe src={pdfDataUri} className="w-full h-96" />
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={downloadPDF}>Download PDF</Button>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </Modal>
      )}
    </>
  );
}
