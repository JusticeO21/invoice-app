import type { Item } from "./AppDataType";

export type FormData = {
  senderStreetAdress: string;
  senderCity: string;
  senderPostCode: string;
  senderCountry: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  clientCity: string;
  clientPostcode: string;
  clientCountry: string;
  createdAt: string;
  paymentTerms: string;
  description: string;
  items: Item[];
};
