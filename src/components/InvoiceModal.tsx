"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import InvoiceDocument from "@/components/InvoiceDocument";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { GetListingResponse } from "@/lib/types";

interface InvoiceModalProps {
  data: GetListingResponse;
  buyerName: string;
  buyerEmail: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function InvoiceModal({
  data,
  buyerName,
  buyerEmail,
  onClose,
  isOpen,
}: InvoiceModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-4">
        {/* PDF Viewer */}
        <div className="w-full h-96 border border-gray-200 rounded-md overflow-hidden">
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <InvoiceDocument
              data={data}
              buyerName={buyerName}
              buyerEmail={buyerEmail}
            />
          </PDFViewer>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-4">
          <PDFDownloadLink
            document={
              <InvoiceDocument
                data={data}
                buyerName={buyerName}
                buyerEmail={buyerEmail}
              />
            }
            fileName="invoice.pdf"
          >
            <Button>Download PDF</Button>
          </PDFDownloadLink>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
}
