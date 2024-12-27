import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { InvoiceSection } from "./InvoiceSection";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    fontSize: 12,
  },
  table: {
    width: "100%",
    border: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    borderBottom: 1,
    borderColor: "#ddd",
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  headerRow: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  cellKey: {
    width: "50%",
    fontWeight: "bold",
  },
  cellValue: {
    width: "50%",
    textAlign: "right",
  },
  descriptionContainer: {
    marginTop: 10,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 12,
    lineHeight: 1.4,
  },
});

interface TechnicalSpecificationsProps {
  age: number;
  dimensions: string;
  weight: number;
  mileage: number;
  hasServiceRecords: boolean;
  hasRust: boolean;
  isFourWheelDrive: boolean | null;
  tankSize: number | null;
  pumpSize: number | null;
  aerialLength: number | null;
  description: string;
}

export function TechnicalSpecifications({
  age,
  dimensions,
  weight,
  mileage,
  hasServiceRecords,
  hasRust,
  isFourWheelDrive,
  tankSize,
  pumpSize,
  aerialLength,
  description,
}: TechnicalSpecificationsProps) {
  const rows = [
    { label: "Year", value: age ? `${age}` : null },
    {
      label: "Dimensions",
      value:
        dimensions.includes("undefined") || dimensions.trim().length === 0
          ? null
          : dimensions,
    },
    { label: "Weight", value: weight ? `${weight} lbs` : null },
    { label: "Mileage", value: mileage ? `${mileage} miles` : null },
    {
      label: "Service Records",
      value: hasServiceRecords ? "Available" : "Not Available",
    },
    {
      label: "Rust Condition",
      value: hasRust ? "Has Rust" : "No Rust",
    },
    {
      label: "Four-Wheel Drive",
      value: isFourWheelDrive === null ? null : isFourWheelDrive ? "Yes" : "No",
    },
    { label: "Tank Size", value: tankSize ? `${tankSize} gallons` : null },
    { label: "Pump Size", value: pumpSize ? `${pumpSize} GPM` : null },
    {
      label: "Aerial Length",
      value: aerialLength ? `${aerialLength} ft` : null,
    },
  ].filter((row) => row.value !== null); // Filter out invalid rows

  return (
    <InvoiceSection title="Technical Specifications">
      {rows.length > 0 && (
        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={styles.cellKey}>Attribute</Text>
            <Text style={styles.cellValue}>Value</Text>
          </View>
          {rows.map((row, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cellKey}>{row.label}</Text>
              <Text style={styles.cellValue}>{row.value}</Text>
            </View>
          ))}
        </View>
      )}

      {description && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      )}
    </InvoiceSection>
  );
}
