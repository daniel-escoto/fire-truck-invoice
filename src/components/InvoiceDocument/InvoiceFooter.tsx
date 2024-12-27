import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  footer: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 10,
  },
});

export function InvoiceFooter() {
  return <Text style={styles.footer}>Thank you for your business!</Text>;
}
