import React from "react";
import { Text } from "@react-pdf/renderer";
import { InvoiceSection } from "./InvoiceSection";

interface ListingOverviewProps {
  title: string;
  price: number;
  brand: string;
  vin: string | null;
}

export function ListingOverview({
  title,
  price,
  brand,
  vin,
}: ListingOverviewProps) {
  return (
    <InvoiceSection title="Listing Overview">
      <Text>Title: {title}</Text>
      <Text>Price: ${price}</Text>
      <Text>Brand: {brand}</Text>
      <Text>VIN: {vin || "N/A"}</Text>
    </InvoiceSection>
  );
}
