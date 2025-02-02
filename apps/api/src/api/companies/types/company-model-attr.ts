import { Location } from '../../../types/location';

export interface CompanyModelAttr {
    id: string;
    tradeName: string;
    legalName: string;
    cnpj: string;
    employeesQuantity: number;
    foundationYear: number;
    linkedin: string | null;
    github: string | null;
    instagram: string | null;
    facebook: string | null;
    twitter: string | null;
    youtube: string | null;
    medium: string | null;
    website: string | null;
    about: string | null;
    contactPhone: string;
    contactEmail: string;
    location: Location;
    bannerUrl: string | null;
    logoUrl: string | null;
    mission: string | null;
    vision: string | null;
    values: string[] | null;
    industry: string;
    gallery: {
        url: string;
        order: number;
    }[];
}
