"use client";

import { useState } from "react";
import Header from "@/components/Header";
import LinkInput from "@/components/LinkInput";
import ResponseMessage from "@/components/ResponseMessage";
import { extractUUID, getListing } from "@/lib/api";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (link: string) => {
    setResponse(null);
    setIsError(false);

    try {
      const uuid = extractUUID(link);
      if (!uuid) {
        throw new Error("Invalid URL: No valid UUID found.");
      }

      const data = await getListing(uuid);
      setResponse(`Listing Title: ${data.result.listing.listingTitle}`);
      setIsError(false);
    } catch {
      setResponse("An error occurred while fetching data.");
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <Header />
      <LinkInput onSubmit={handleSubmit} />
      {response && <ResponseMessage message={response} isError={isError} />}
    </div>
  );
}
