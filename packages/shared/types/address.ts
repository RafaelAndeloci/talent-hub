import { Uf } from './uf';

export interface Address {
    street: string;
    number: string;
    complement: string | null;
    neighborhood: string;
    city: string;
    uf: Uf;
    zipCode: string;
}
