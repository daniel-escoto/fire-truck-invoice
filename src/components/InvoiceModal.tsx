"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";

interface InvoiceModalProps {
  pdfDataUri: string;
  onDownload: () => void;
  onClose: () => void;
}

export default function InvoiceModal({
  pdfDataUri,
  onDownload,
  onClose,
}: InvoiceModalProps) {
  return (
    <Modal onClose={onClose}>
      <iframe
        src={pdfDataUri}
        className="w-full h-96"
        title="Invoice Preview"
      />
      <div className="flex justify-center gap-4 mt-4">
        <Button onClick={onDownload}>Download PDF</Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
}
