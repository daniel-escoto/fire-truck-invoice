import React from "react";
import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    fontSize: 10,
  },
});

export function InvoiceHeader() {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} src="/images/garage-logo.png" />
      <Text style={styles.title}>Invoice</Text>
      <Text style={styles.date}>Date: {new Date().toLocaleDateString()}</Text>
    </View>
  );
}
