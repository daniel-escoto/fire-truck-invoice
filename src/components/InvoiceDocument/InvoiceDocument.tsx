import React from "react";
import { Document, Page, StyleSheet, Font } from "@react-pdf/renderer";
import { InvoiceHeader } from "./InvoiceHeader";
import { BuyerInfo } from "./BuyerInfo";
import { SellerInfo } from "./SellerInfo";
import { ListingOverview } from "./ListingOverview";
import { TechnicalSpecifications } from "./TechnicalSpecifications";
import { AuctionDetails } from "./AuctionDetails";
import { InvoiceFooter } from "./InvoiceFooter";
import { GetListingResponse } from "@/lib/types";

Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter/Inter-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/Inter/Inter-Medium.ttf", fontWeight: "medium" },
    { src: "/fonts/Inter/Inter-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Inter/Inter-Italic.ttf", fontStyle: "italic" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Inter",
    fontSize: 12,
    color: "#333",
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
        <InvoiceHeader />

        <ListingOverview
          brand={listing.itemBrand}
          price={listing.sellingPrice}
          title={listing.listingTitle}
          vin={listing.vin}
          imageUrl={listing.imageUrls[0] || null}
        />

        <TechnicalSpecifications
          age={listing.itemAge}
          dimensions={`${listing.itemHeight} x ${listing.itemWidth}`}
          weight={listing.itemWeight}
        />

        {listing.isAuction && <AuctionDetails {...listing} />}

        <BuyerInfo name={buyerName} email={buyerEmail} />

        <SellerInfo
          email={listing.user.email}
          address={`${listing.addressPrimary}, ${listing.addressCity}, ${listing.addressState} ${listing.addressZip}`}
        />

        <InvoiceFooter />
      </Page>
    </Document>
  );
}
