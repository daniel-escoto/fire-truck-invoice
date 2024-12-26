"use client";

import { useState } from "react";
import Header from "@/components/Header";
import LinkInput from "@/components/LinkInput";
import ResponseMessage from "@/components/ResponseMessage";
import InvoiceButton from "@/components/InvoiceButton";
import { extractUUID, getListing } from "@/lib/api";
import { GetListingResponse } from "@/lib/types";

export default function Home() {
  const [response, setResponse] = useState<GetListingResponse | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (link: string) => {
    setResponse(null);
    setIsError(false);

    try {
      const uuid = extractUUID(link);
      if (!uuid) {
        throw new Error("Invalid URL: No valid UUID found.");
      }

      const data: GetListingResponse = await getListing(uuid);
      setResponse(data);
      setIsError(false);
    } catch (error) {
      setResponse(null);
      setIsError(true);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <Header />
      <LinkInput onSubmit={handleSubmit} />
      {response && !isError && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">
            {response.result.listing.listingTitle}
          </h2>
          <p>Price: ${response.result.listing.sellingPrice}</p>
          <p>
            Location: {response.result.listing.addressCity},{" "}
            {response.result.listing.addressState}
          </p>
          <p>Mileage: {response.result.listing.mileage} miles</p>
          <InvoiceButton data={response} />
        </div>
      )}
      {isError && (
        <ResponseMessage
          message="An error occurred while fetching data."
          isError={isError}
        />
      )}
    </div>
  );
}
