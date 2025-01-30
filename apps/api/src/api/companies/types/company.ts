import { Address } from '../../../types/address';
import { Contact } from '../../../types/contact';
import { Id } from '../../../types/id';
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
    address: Address;
    bannerUrl: string | null;
    logoUrl: string | null;
    mission: string | null;
    vision: string | null;
    values: string[] | null;
    industry: string;
}
