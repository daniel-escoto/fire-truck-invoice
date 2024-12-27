"use client";

import { useState } from "react";
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
  const [emailError, setEmailError] = useState<string>("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (email: string) => {
    setBuyerEmail(email);
    if (!validateEmail(email) && email.trim()) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-md border border-neutral-200 rounded-xl bg-white p-6 shadow-[0_10px_20px_rgb(0,0,0,0.05)]">
      <TextInput
        label="Buyer Name"
        value={buyerName}
        onChange={setBuyerName}
        placeholder="Enter buyer's name"
        required
      />
      <div className="w-full">
        <TextInput
          label="Buyer Email"
          value={buyerEmail}
          onChange={handleEmailChange}
          placeholder="Enter buyer's email"
          type="email"
          required
        />
        <div className="h-3">
          {emailError && (
            <span className="text-red-500 text-sm">{emailError}</span>
          )}
        </div>
      </div>
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
          !link.trim() ||
          !buyerName.trim() ||
          !buyerEmail.trim() ||
          emailError !== "" ||
          isLoading
        }
      >
        {isLoading ? "Generating..." : "Generate Invoice"}
      </Button>
    </div>
  );
}
