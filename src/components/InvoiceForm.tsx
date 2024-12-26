"use client";

import { useState } from "react";
import Button from "@/components/Button";

interface InvoiceFormProps {
  onSubmit: (link: string) => void;
  isLoading: boolean;
}

export default function InvoiceForm({ onSubmit, isLoading }: InvoiceFormProps) {
  const [link, setLink] = useState("");

  const handleClick = () => {
    if (!link.trim()) return;
    onSubmit(link);
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-md">
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Paste a link"
        className="w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      />
      <Button onClick={handleClick} disabled={!link.trim() || isLoading}>
        {isLoading ? "Generating..." : "Generate Invoice"}
      </Button>
    </div>
  );
}
