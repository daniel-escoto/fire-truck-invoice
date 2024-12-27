import React from "react";
import { Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { InvoiceSection } from "./InvoiceSection";

interface ListingOverviewProps {
  title: string;
  price: number;
  brand: string;
  vin: string | null;
  imageUrl: string | null;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 5,
    border: 1,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
    fontSize: 12,
  },
  text: {
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export function ListingOverview({
  title,
  price,
  brand,
  vin,
  imageUrl,
}: ListingOverviewProps) {
  console.log("url: ", imageUrl);

  return (
    <InvoiceSection title="Listing Overview">
      <View style={styles.container}>
        {/* Thumbnail Image */}
        {imageUrl ? (
          //   eslint-disable-next-line jsx-a11y/alt-text
          <Image src={imageUrl} style={styles.image} />
        ) : (
          <View
            style={{
              ...styles.image,
              backgroundColor: "#f0f0f0",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 10 }}>No Image</Text>
          </View>
        )}

        {/* Details Section */}
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>Price: ${price}</Text>
          <Text style={styles.text}>Brand: {brand}</Text>
          <Text style={styles.text}>VIN: {vin || "N/A"}</Text>
        </View>
      </View>
    </InvoiceSection>
  );
}
