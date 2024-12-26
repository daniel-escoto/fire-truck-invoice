export interface User {
  id: string;
  email: string;
}

export interface Listing {
  id: string;
  createdAt: string;
  updatedAt: string;
  listingTitle: string;
  sellingPrice: number;
  imageUrls: string[];
  listingStatus: number;
  tags: string[];
  categories: number[];
  itemBrand: string;
  listingDescription: string;
  itemAge: number;
  itemLength: number;
  itemWidth: number;
  itemHeight: number;
  itemWeight: number;
  addressPrimary: string;
  addressSecondary: string;
  addressCity: string;
  addressZip: string;
  addressState: string;
  mileage: number;
  hasServiceRecords: boolean;
  hasRust: boolean;
  isFourWheelDrive: boolean | null;
  tankSize: number | null;
  pumpSize: number | null;
  hasPumpTest: boolean;
  aerialLength: number | null;
  isAuction: boolean;
  expirationDate: string | null;
  finalPrice: number | null;
  vin: string | null;
  userId: string;
  user: User;
}

export interface GetListingResponse {
  result: {
    listing: Listing;
  };
  error: string;
}
