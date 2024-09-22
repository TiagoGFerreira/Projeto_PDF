
import { Country, PostalCode } from "./BaseData"

export interface GetOrganization{
    id: number,
    name: string,
    logoUrl: string,
    email: string,
    adress: Adress 
}

export interface AddOrganization{
    name: string,
    logoUrl: string,
    countryId: number,
    street: string,
    doorNumber: number,
    postalCode: number,
    phoneNumber: number,
    email: string,
    adminEmail: string
}

export interface EditOrganization {
    name: string | null;
    logoUrl: string | null;
    countryId: number | null;
    street: string | null;
    doorNumber: number | null;
    postalCode: number | null;
    phoneNumber: number | null;
    email: string | null;
    adminEmail: string | null;
  }
  



export interface Adress{
    id: number,
    street: string,
    number: number,
    postalCode: PostalCode,
    country: Country
}
