import React from "react";
import { Text } from "@react-pdf/renderer";
import { InvoiceSection } from "./InvoiceSection";

interface BuyerInfoProps {
  name: string;
  email: string;
}

export function BuyerInfo({ name, email }: BuyerInfoProps) {
  return (
    <InvoiceSection title="Buyer Information">
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
    </InvoiceSection>
  );
}
