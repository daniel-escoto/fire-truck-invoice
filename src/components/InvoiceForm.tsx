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
  const [linkError, setLinkError] = useState<string>("");

  // Validate Email
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

  // Validate URL
  const validateURL = (url: string) => {
    const urlRegex =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    return urlRegex.test(url);
  };

  const handleLinkChange = (url: string) => {
    setLink(url);
    if (!validateURL(url) && url.trim()) {
      setLinkError("Please enter a valid URL (e.g., https://example.com)");
    } else {
      setLinkError("");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-md border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-[0_10px_20px_rgb(0,0,0,0.05)] dark:shadow-[0_10px_20px_rgb(0,0,0,0.2)]">
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
      <div className="w-full">
        <TextInput
          label="Listing Link"
          value={link}
          onChange={handleLinkChange}
          placeholder="Paste a listing link"
          type="text"
          required
        />
        <div className="h-3">
          {linkError && (
            <span className="text-red-500 text-sm">{linkError}</span>
          )}
        </div>
      </div>
      <Button
        onClick={onSubmit}
        disabled={
          !link.trim() ||
          !buyerName.trim() ||
          !buyerEmail.trim() ||
          emailError !== "" ||
          linkError !== "" ||
          isLoading
        }
      >
        {isLoading ? "Generating..." : "Generate Invoice"}
      </Button>
    </div>
  );
}
