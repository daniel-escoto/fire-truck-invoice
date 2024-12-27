import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { InvoiceSection } from "./InvoiceSection";

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  detailKey: {
    fontWeight: "bold",
  },
});

interface TechnicalSpecificationsProps {
  age: number;
  dimensions: string;
  weight: number;
}

export function TechnicalSpecifications({
  age,
  dimensions,
  weight,
}: TechnicalSpecificationsProps) {
  return (
    <InvoiceSection title="Technical Specifications">
      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Age:</Text>
        <Text>{age} years</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Dimensions:</Text>
        <Text>{dimensions}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Weight:</Text>
        <Text>{weight} lbs</Text>
      </View>
    </InvoiceSection>
  );
}
