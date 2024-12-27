"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { GetListingResponse } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    fontSize: 10,
  },
  buyerSellerSection: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    marginBottom: 2,
  },
  listingDetails: {
    marginTop: 20,
  },
  footer: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 10,
  },
});

interface InvoiceDocumentProps {
  data: GetListingResponse;
  buyerName: string;
  buyerEmail: string;
}

export default function InvoiceDocument({
  data,
  buyerName,
  buyerEmail,
}: InvoiceDocumentProps) {
  const { listing } = data.result;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={styles.logo} src="/images/garage-logo.png" />
          <Text style={styles.title}>Invoice</Text>
          <Text style={styles.date}>
            Date: {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Buyer Section */}
        <View style={styles.buyerSellerSection}>
          <Text style={styles.subtitle}>Buyer Information</Text>
          <Text style={styles.text}>Name: {buyerName}</Text>
          <Text style={styles.text}>Email: {buyerEmail}</Text>
        </View>

        {/* Seller Section */}
        <View style={styles.buyerSellerSection}>
          <Text style={styles.subtitle}>Seller Information</Text>
          <Text style={styles.text}>Email: {listing.user.email}</Text>
          <Text style={styles.text}>
            Address: {listing.addressPrimary}, {listing.addressCity},{" "}
            {listing.addressState} {listing.addressZip}
          </Text>
        </View>

        {/* Listing Details */}
        <View style={styles.listingDetails}>
          <Text style={styles.subtitle}>Listing Details</Text>
          <Text style={styles.text}>Title: {listing.listingTitle}</Text>
          <Text style={styles.text}>Price: ${listing.sellingPrice}</Text>
          <Text style={styles.text}>Brand: {listing.itemBrand}</Text>
          <Text style={styles.text}>Mileage: {listing.mileage} miles</Text>
          <Text style={styles.text}>
            Description: {listing.listingDescription || "No description"}
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
}
