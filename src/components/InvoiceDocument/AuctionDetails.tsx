import React from "react";
import { Text } from "@react-pdf/renderer";
import { InvoiceSection } from "./InvoiceSection";

interface AuctionDetailsProps {
  expirationDate: string | null;
  finalPrice: number | null;
}

export function AuctionDetails({
  expirationDate,
  finalPrice,
}: AuctionDetailsProps) {
  return (
    <InvoiceSection title="Auction Details">
      <Text>Expiration Date: {expirationDate || "N/A"}</Text>
      <Text>Final Price: ${finalPrice || "N/A"}</Text>
    </InvoiceSection>
  );
}
