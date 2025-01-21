import * as dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const envPath = path.resolve(__dirname, `../../.env.${env}`);

dotenv.config({ path: envPath });

const config = {
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
  },
  security: {
    secret: process.env.JWT_SECRET || 'secret',
    audience: process.env.JWT_AUDIENCE || 'audience',
    issuer: process.env.JWT_ISSUER || 'issuer',
    //** Token Expiration in hours */
    expiresIn: parseFloat(process.env.JWT_EXPIRES_IN || '1'),
  },
  fileStorage: {},
  allowedMimeTypes: {
    images: ['image/jpeg', 'image/png'],
    documents: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
};

export default config;
