"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import InvoiceDocument from "@/components/InvoiceDocument/InvoiceDocument";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { GetListingResponse } from "@/lib/types";

interface InvoiceModalProps {
  data: GetListingResponse;
  buyerName: string;
  buyerEmail: string;
  onClose: () => void;
  isOpen: boolean;
  link: string;
}

export default function InvoiceModal({
  data,
  buyerName,
  buyerEmail,
  onClose,
  isOpen,
  link,
}: InvoiceModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex-1 overflow-y-auto border border-gray-200 rounded-md">
        <PDFViewer style={{ width: "100%", height: "60vh" }}>
          <InvoiceDocument
            data={data}
            buyerName={buyerName}
            buyerEmail={buyerEmail}
            link={link}
          />
        </PDFViewer>
      </div>

      <div className="flex justify-end gap-4 mt-4 border-t pt-4">
        <PDFDownloadLink
          document={
            <InvoiceDocument
              data={data}
              buyerName={buyerName}
              buyerEmail={buyerEmail}
              link={link}
            />
          }
          fileName="invoice.pdf"
        >
          <Button>Download PDF</Button>
        </PDFDownloadLink>
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
}
