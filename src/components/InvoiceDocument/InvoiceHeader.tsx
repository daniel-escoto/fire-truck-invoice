import React from "react";
import { View, Text, Image, StyleSheet, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: "1 solid #E0E0E0",
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: "contain",
    marginBottom: 4,
  },
  titleContainer: {
    textAlign: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  date: {
    fontSize: 10,
    textAlign: "right",
  },
});

export function InvoiceHeader() {
  return (
    <View style={styles.header}>
      {/* Logo with Link */}
      <View style={styles.logoContainer}>
        <Link src="https://www.withgarage.com">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={styles.logo} src="/images/garage-logo.png" />
        </Link>
      </View>

      {/* Title and Optional Subtitle */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Invoice</Text>
        <Text style={styles.subtitle}>Your Trusted Fire Truck Partner</Text>
      </View>

      {/* Date */}
      <Text style={styles.date}>
        Date:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
    </View>
  );
}
