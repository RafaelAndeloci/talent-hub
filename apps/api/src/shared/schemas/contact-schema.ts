import { z } from 'zod'
import { Contact } from '../types/contact'
/**
 * @swagger
 * components:
 *  schemas:
 *     ContactSchema:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          example: pedro.lima47@fatec.sp.gov.br
 *        phone:
 *          type: string
 *          pattern: '^\+?[0-9]{11}$'
 */
export const ContactSchema: z.ZodType<Contact> = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9]{11}$/),
})
