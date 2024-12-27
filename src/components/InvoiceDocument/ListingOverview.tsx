import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { InvoiceSection } from "./InvoiceSection";

interface ListingOverviewProps {
  title: string;
  price: number;
  brand: string;
  vin: string | null;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    marginBottom: 2,
  },
});

export function ListingOverview({
  title,
  price,
  brand,
  vin,
}: ListingOverviewProps) {
  return (
    <InvoiceSection title="Listing Overview">
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>Price: ${price}</Text>
        <Text style={styles.text}>Brand: {brand}</Text>
        <Text style={styles.text}>VIN: {vin || "N/A"}</Text>
      </View>
    </InvoiceSection>
  );
}
