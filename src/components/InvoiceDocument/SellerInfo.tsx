import React from "react";
import { Text } from "@react-pdf/renderer";
import { InvoiceSection } from "./InvoiceSection";

interface SellerInfoProps {
  email: string;
  address: string;
}

export function SellerInfo({ email, address }: SellerInfoProps) {
  return (
    <InvoiceSection title="Seller Information">
      <Text>Email: {email}</Text>
      <Text>Address: {address}</Text>
    </InvoiceSection>
  );
}
