import React from "react";
import { Document, Page } from "@react-pdf/renderer";
import { InvoiceHeader } from "./InvoiceHeader";
import { BuyerInfo } from "./BuyerInfo";
import { SellerInfo } from "./SellerInfo";
import { ListingOverview } from "./ListingOverview";
import { TechnicalSpecifications } from "./TechnicalSpecifications";
import { AuctionDetails } from "./AuctionDetails";
import { InvoiceFooter } from "./InvoiceFooter";
import { GetListingResponse } from "@/lib/types";

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
      <Page>
        <InvoiceHeader />
        <BuyerInfo name={buyerName} email={buyerEmail} />
        <SellerInfo
          email={listing.user.email}
          address={`${listing.addressPrimary}, ${listing.addressCity}, ${listing.addressState} ${listing.addressZip}`}
        />
        <ListingOverview
          brand={listing.itemBrand}
          price={listing.sellingPrice}
          title={listing.listingTitle}
          vin={listing.vin}
        />
        <TechnicalSpecifications
          age={listing.itemAge}
          dimensions={`${listing.itemHeight} x ${listing.itemWidth}`}
          weight={listing.itemWeight}
        />
        {listing.isAuction && <AuctionDetails {...listing} />}
        <InvoiceFooter />
      </Page>
    </Document>
  );
}
