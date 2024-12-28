import React from "react";
import { Text } from "@react-pdf/renderer";
import { InvoiceSection } from "./InvoiceSection";

interface AuctionDetailsProps {
  expirationDate: string | null;
  finalPrice: number | null;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function AuctionDetails({
  expirationDate,
  finalPrice,
}: AuctionDetailsProps) {
  return (
    <InvoiceSection title="Auction Details">
      <Text>Expiration Date: {formatDate(expirationDate)}</Text>
      <Text>Final Price: {finalPrice ? `$${finalPrice}` : "N/A"}</Text>
    </InvoiceSection>
  );
}
