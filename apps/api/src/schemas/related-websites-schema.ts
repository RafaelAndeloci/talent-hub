import { z } from 'zod';
import { RelatedWebsites } from '../types/related-websites';

/**
 * @swagger
 * components:
 *  schemas:
 *   RelatedWebsiteSchema:
 *    type: object
 *    properties:
 *     linkedin:
 *      type: string
 *      format: url
 *      nullable: true
 *     github:
 *      type: string
 *      format: url
 *      nullable: true
 *     twitter:
 *      type: string
 *      format: url
 *      nullable: true
 *     facebook:
 *      type: string
 *      format: url
 *      nullable: true
 *     instagram:
 *      type: string
 *      format: url
 *      nullable: true
 *     youtube:
 *      type: string
 *      format: url
 *      nullable: true
 *     medium:
 *      type: string
 *      format: url
 *      nullable: true
 *     website:
 *      type: string
 *      format: url
 *      nullable: true
 */
export const RelatedWebsiteSchema: z.ZodType<RelatedWebsites> = z.object({
    linkedin: z.string().url().nullable(),
    github: z.string().url().nullable(),
    twitter: z.string().url().nullable(),
    facebook: z.string().url().nullable(),
    instagram: z.string().url().nullable(),
    youtube: z.string().url().nullable(),
    medium: z.string().url().nullable(),
    website: z.string().url().nullable(),
});
