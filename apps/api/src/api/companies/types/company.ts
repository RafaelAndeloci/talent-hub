import { Contact } from '../../../types/contact';
import { Id } from '../../../types/id';
import { Location } from '../../../types/location';
import { RelatedWebsites } from '../../../types/related-websites';

export interface Company extends Id {
    tradeName: string;
    legalName: string;
    cnpj: string;
    employeesQuantity: number;
    foundationYear: number;
    social: RelatedWebsites;
    about: string | null;
    contact: Contact;
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
