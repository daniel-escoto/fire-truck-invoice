"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

interface InvoiceFormProps {
  link: string;
  setLink: (link: string) => void;
  buyerName: string;
  setBuyerName: (name: string) => void;
  buyerEmail: string;
  setBuyerEmail: (email: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function InvoiceForm({
  link,
  setLink,
  buyerName,
  setBuyerName,
  buyerEmail,
  setBuyerEmail,
  onSubmit,
  isLoading,
}: InvoiceFormProps) {
  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-md">
      <TextInput
        label="Buyer Name"
        value={buyerName}
        onChange={setBuyerName}
        placeholder="Enter buyer's name"
        required
      />
      <TextInput
        label="Buyer Email"
        value={buyerEmail}
        onChange={setBuyerEmail}
        placeholder="Enter buyer's email"
        type="email"
        required
      />
      <TextInput
        label="Listing Link"
        value={link}
        onChange={setLink}
        placeholder="Paste a listing link"
        required
      />
      <Button
        onClick={onSubmit}
        disabled={
          !link.trim() || !buyerName.trim() || !buyerEmail.trim() || isLoading
        }
      >
        {isLoading ? "Generating..." : "Generate Invoice"}
      </Button>
    </div>
  );
}
