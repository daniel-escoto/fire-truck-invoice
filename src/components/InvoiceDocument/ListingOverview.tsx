import React from "react";
import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { InvoiceSection } from "./InvoiceSection";

interface ListingOverviewProps {
  title: string;
  price: number;
  brand: string;
  vin: string | null;
  link: string;
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
  linkContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 10,
    marginRight: 4,
  },
  link: {
    color: "blue",
    textDecoration: "underline",
    fontSize: 10,
    wordBreak: "break-all", // Prevents overflow if the URL is long
  },
});

export function ListingOverview({
  title,
  price,
  brand,
  vin,
  link,
}: ListingOverviewProps) {
  return (
    <InvoiceSection title="Listing Overview">
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>Price: ${price}</Text>
        <Text style={styles.text}>Brand: {brand}</Text>
        <Text style={styles.text}>VIN: {vin || "N/A"}</Text>
        {link && (
          <View style={styles.linkContainer}>
            <Text style={styles.label}>View Listing:</Text>
            <Link src={link} style={styles.link}>
              {link}
            </Link>
          </View>
        )}
      </View>
    </InvoiceSection>
  );
}
