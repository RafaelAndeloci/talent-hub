import { AddressSchema } from "@talent-hub/shared";
import { z } from "zod";

export enum Uf {
  AC = "AC",
  AL = "AL",
  AP = "AP",
  AM = "AM",
  BA = "BA",
  CE = "CE",
  DF = "DF",
  ES = "ES",
  GO = "GO",
  MA = "MA",
  MT = "MT",
  MS = "MS",
  MG = "MG",
  PA = "PA",
  PB = "PB",
  PR = "PR",
  PE = "PE",
  PI = "PI",
  RJ = "RJ",
  RN = "RN",
  RS = "RS",
  RO = "RO",
  RR = "RR",
  SC = "SC",
  SP = "SP",
  SE = "SE",
  TO = "TO",
}

export const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\d{11}$/),
});

export const addressSchema = z.object({
  street: z.string(),
  number: z.string(),
  complement: z.string().nullable(),
  neighborhood: z.string(),
  city: z.string(),
  uf: z.nativeEnum(Uf),
  zipCode: z.string().regex(/^\d{8}$/),
});

export const addressAndContactSchema = z.object({
  contact: contactSchema,
  address: addressSchema,
});

AddressSchema;
export type ContactSchema = z.infer<typeof contactSchema>;
export type AddressAndContact = z.infer<typeof addressAndContactSchema>;
