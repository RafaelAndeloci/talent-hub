import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    API_PORT: z.number().default(3000),
    API_HOST: z.string().default('localhost'),
    API_DOC_ENABLED: z.boolean().default(true),
    API_BASE_PATH: z.string().default('/api'),

    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.number().default(5432),
    DB_USER: z.string().default('postgres'),
    DB_PASSWORD: z.string().default('postgres'),
    DB_NAME: z.string().default('postgres'),
    DB_LOG_ENABLED: z.boolean().default(true),
    DB_POOL_MIN: z.string().default('0'),
    DB_POOL_MAX: z.string().default('5'),
    DB_SYNC_ENABLED: z.boolean().default(true),
    DB_SYNC_FORCE: z.boolean().default(true),
    DB_SYNC_ALTER: z.boolean().default(true),

    SECURITY_ENABLED: z.boolean().default(true),
    SECURITY_SECRET: z.string().default('secret'),
    SECURITY_AUDIENCE: z.string().default('audience'),
    SECURITY_ISSUER: z.string().default('issuer'),
    SECURITY_EXPIRES_IN: z.string().default('1'),
    SECURITY_PASSWORD_RESET_EXPIRATION: z.string().default('1'),
    SECURITY_PASSWORD_HASH_SALT: z.string().default('salt'),
    SECURITY_PASSWORD_RESET_PAGE_URL: z.string().default('reset'),

    FILE_STORAGE_CV_ALLOWED_TYPES: z.string().default('pdf,docx,png,jpg'),
    FILE_STORAGE_CV_MAX_SIZE: z.string().default('5000000'),
    FILE_STORAGE_IMAGES_ALLOWED_TYPES: z.string().default('png,jpg,webp'),
    FILE_STORAGE_IMAGES_MAX_SIZE: z.string().default('5000000'),
    FILE_STORAGE_COMPANY_MAX_GALLERY_SIZE: z.string().default('5000000'),

    SYS_ADMIN_ID: z.string().default('d4a5d03c-0fd3-4a06-a2ce-51d21c8ed54a'),
    SYS_ADMIN_EMAIL: z.string().default('pedro.lima47@fatec.sp.gov.br'),
    SYS_ADMIN_PASSWORD: z.string().default('admin123'),
    SYS_ADMIN_USERNAME: z.string().default('admin'),

    BUCKET_ACCESS_KEY_ID: z.string().default(''),
    BUCKET_SECRET_ACCESS_KEY: z.string().default(''),
    BUCKET_DEFAULT: z.string().default(''),
    BUCKET_SERVICE_URL: z.string().default(''),
    BUCKET_REGION: z.string().default(''),
    BUCKET_EXPOSE_URL: z.string().default(''),

    CACHE_HOST: z.string().default('localhost'),
    CACHE_PORT: z.string().default('6379'),

    EMAIL_USER: z.string().default(''),
    EMAIL_PASSWORD: z.string().default(''),
    EMAIL_FROM: z.string().default('talent_hub@noreply.com'),
    EMAIL_CONFIRMATION_URL: z.string().default(''),

    AWS_REGION: z.string().default(''),
    AWS_ACCESS_KEY_ID: z.string().default(''),
    AWS_SECRET_ACCESS_KEY: z.string().default(''),
    AWS_SES_FROM: z.string().default(''),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    API_PORT: process.env.API_PORT,
    API_HOST: process.env.API_HOST,
    API_DOC_ENABLED: process.env.API_DOC_ENABLED,
    API_BASE_PATH: process.env.API_BASE_PATH,

    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_LOG_ENABLED: process.env.DB_LOG_ENABLED,
    DB_POOL_MIN: process.env.DB_POOL_MIN,
    DB_POOL_MAX: process.env.DB_POOL_MAX,
    DB_SYNC_ENABLED: process.env.DB_SYNC_ENABLED,
    DB_SYNC_FORCE: process.env.DB_SYNC_FORCE,
    DB_SYNC_ALTER: process.env.DB_SYNC_ALTER,

    SECURITY_ENABLED: process.env.SECURITY_ENABLED,
    SECURITY_SECRET: process.env.SECURITY_SECRET,
    SECURITY_AUDIENCE: process.env.SECURITY_AUDIENCE,
    SECURITY_ISSUER: process.env.SECURITY_ISSUER,
    SECURITY_EXPIRES_IN: process.env.SECURITY_EXPIRES_IN,
    SECURITY_PASSWORD_RESET_EXPIRATION:
      process.env.SECURITY_PASSWORD_RESET_EXPIRATION,
    SECURITY_PASSWORD_HASH_SALT: process.env.SECURITY_PASSWORD_HASH_SALT,
    SECURITY_PASSWORD_RESET_PAGE_URL:
      process.env.SECURITY_PASSWORD_RESET_PAGE_URL,

    FILE_STORAGE_CV_ALLOWED_TYPES: process.env.FILE_STORAGE_CV_ALLOWED_TYPES,
    FILE_STORAGE_CV_MAX_SIZE: process.env.FILE_STORAGE_CV_MAX_SIZE,
    FILE_STORAGE_IMAGES_ALLOWED_TYPES:
      process.env.FILE_STORAGE_IMAGES_ALLOWED_TYPES,
    FILE_STORAGE_IMAGES_MAX_SIZE: process.env.FILE_STORAGE_IMAGES_MAX_SIZE,
    FILE_STORAGE_COMPANY_MAX_GALLERY_SIZE:
      process.env.FILE_STORAGE_COMPANY_MAX_GALLERY_SIZE,

    SYS_ADMIN_ID: process.env.SYS_ADMIN_ID,
    SYS_ADMIN_EMAIL: process.env.SYS_ADMIN_EMAIL,
    SYS_ADMIN_PASSWORD: process.env.SYS_ADMIN_PASSWORD,
    SYS_ADMIN_USERNAME: process.env.SYS_ADMIN_USERNAME,

    BUCKET_ACCESS_KEY_ID: process.env.BUCKET_ACCESS_KEY_ID,
    BUCKET_SECRET_ACCESS_KEY: process.env.BUCKET_SECRET_ACCESS_KEY,
    BUCKET_DEFAULT: process.env.BUCKET_DEFAULT,
    BUCKET_SERVICE_URL: process.env.BUCKET_SERVICE_URL,
    BUCKET_REGION: process.env.BUCKET_REGION,
    BUCKET_EXPOSE_URL: process.env.BUCKET_EXPOSE_URL,

    CACHE_HOST: process.env.CACHE_HOST,
    CACHE_PORT: process.env.CACHE_PORT,

    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_CONFIRMATION_URL: process.env.EMAIL_CONFIRMATION_URL,

    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_SES_FROM: process.env.AWS_SES_FROM,
  },
  emptyStringAsUndefined: false,
})
