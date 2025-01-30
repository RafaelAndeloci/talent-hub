import { Address } from '../types/address';
import { z } from 'zod';
import { Uf } from '../enums/uf';

/**
 * @swagger
 * components:
 *  schemas:
 *   AddressSchema:
 *    type: object
 *    properties:
 *      street:
 *       type: string
 *       maxLength: 100
 *       example: Rua das Flores
 *      number:
 *        type: string
 *        pattern: '^\d{1,15}$'
 *        example: 123
 *      complement:
 *        type: string
 *        maxLength: 100
 *        nullable: true
 *        example: Casa
 *      neighborhood:
 *        type: string
 *        maxLength: 100
 *        example: Jardim das Rosas
 *      city:
 *        type: string
 *        maxLength: 100
 *        example: São Paulo
 *      uf:
 *        type: string
 *        enum: [AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO]
 *        example: SP
 */
export const AddressSchema: z.ZodType<Address> = z.object({
    street: z.string().max(100),
    number: z.string().regex(/^\d{1,15}$/),
    complement: z.string().max(100).nullable(),
    neighborhood: z.string().max(100),
    city: z.string().max(100),
    uf: z.nativeEnum(Uf),
    zipCode: z.string().regex(/^\d{8}$/),
});
