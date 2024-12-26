import { useState } from "react";
import { extractUUID, getListing } from "@/lib/api";
import { GetListingResponse } from "@/lib/types";

export function useInvoice() {
  const [data, setData] = useState<GetListingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInvoiceData = async (link: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const uuid = extractUUID(link);
      if (!uuid) {
        throw new Error("Invalid URL: No valid UUID found.");
      }

      const result = await getListing(uuid);
      setData(result);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    fetchInvoiceData,
  };
}
