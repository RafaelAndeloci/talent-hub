import * as dotenv from 'dotenv'
import path from 'path'

const env = process.env.NODE_ENV || 'development'
const envPath = path.resolve(__dirname, `../../.env`)

dotenv.config({ path: envPath })

export const config = {
  env,
  api: {
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || 'localhost',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    logEnabled: process.env.DB_LOG_ENABLED === 'true',
  },
  security: {
    enabled: process.env.JWT_ENABLED === 'true',
    secret: process.env.JWT_SECRET || 'secret',
    audience: process.env.JWT_AUDIENCE || 'audience',
    issuer: process.env.JWT_ISSUER || 'issuer',
    expiresIn: parseFloat(process.env.JWT_EXPIRES_IN || '1'),
    passwordSalt: process.env.PASSWORD_SALT || 'salt',
  },
  fileStorage: {
    cv: {
      allowedTypes: process.env.ALLOWED_CV_TYPES!.split(','),
      maxSize: parseInt(process.env.MAX_CV_SIZE!),
    },
    images: {
      allowedTypes: process.env.ALLOWED_IMAGE_TYPES!.split(','),
      maxSize: parseInt(process.env.MAX_IMAGE_SIZE!),
    },
  },
  sysAdmin: {
    id: process.env.SYS_ADMIN_ID,
    email: process.env.SYS_ADMIN_EMAIL,
    password: process.env.SYS_ADMIN_PASSWORD,
  },
  bucket: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY_ID!,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY!,
    defaultBucket: process.env.BUCKET_DEFAULT!,
    serviceUrl: process.env.BUCKET_SERVICE_URL!,
    region: process.env.BUCKET_REGION!,
    exposeUrl: process.env.BUCKET_EXPOSE_URL!,
  },
}
