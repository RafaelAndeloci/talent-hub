import * as dotenv from 'dotenv';
import * as uuid from 'uuid';
import path from 'path';
import { logger } from '../services/logging-service';

const env = process.env.NODE_ENV || 'development';

try {
    const envPath = path.resolve(__dirname, `../../../../.env`);

    const { error } = dotenv.config({ path: envPath });

    if (error) {
        logger.error(`Error loading environment variables: ${error.message}`);
        process.exit(1);
    }
} catch (error) {
    logger.error(`Error loading environment variables: ${(error as unknown as Error).message}`);
    process.exit(1);
}

export const config = {
    env,
    api: {
        port: parseInt(process.env.PORT || '3000'),
        host: process.env.HOST || 'localhost',
        docEnabled: process.env.API_DOC_ENABLED === 'true',
        basePath: '/api',
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'postgres',
        logEnabled: process.env.DB_LOG_ENABLED === 'true',
        pool: {
            min: parseInt(process.env.DB_POOL_MIN || '0'),
            max: parseInt(process.env.DB_POOL_MAX || '5'),
        },
        sync: {
            enabled: process.env.DB_SYNC_ENABLED === 'true',
            force: process.env.DB_SYNC_FORCE === 'true',
            alter: process.env.DB_SYNC_ALTER === 'true',
        },
    },
    security: {
        enabled: process.env.JWT_ENABLED === 'true',
        secret: process.env.JWT_SECRET || 'secret',
        audience: process.env.JWT_AUDIENCE || 'audience',
        issuer: process.env.JWT_ISSUER || 'issuer',
        expiresIn: parseFloat(process.env.JWT_EXPIRES_IN || '1'),
        password: {
            resetExpiration: parseInt(process.env.PASSWORD_RESET_EXPIRATION || '1'),
            hashSalt: process.env.PASSWORD_HASH_SALT || 'salt',
            resetPageUrl: process.env.PASSWORD_RESET_PAGE_URL || 'reset',
        },
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
        id: process.env.SYS_ADMIN_ID || uuid.v4(),
        email: process.env.SYS_ADMIN_EMAIL || 'pedro.lima47@fatec.sp.gov.br',
        password: process.env.SYS_ADMIN_PASSWORD || 'admin123',
        username: process.env.SYS_ADMIN_USERNAME || 'admin',
    },
    bucket: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY_ID!,
        secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY!,
        defaultBucket: process.env.BUCKET_DEFAULT!,
        serviceUrl: process.env.BUCKET_SERVICE_URL!,
        region: process.env.BUCKET_REGION!,
        exposeUrl: process.env.BUCKET_EXPOSE_URL!,
    },
    cache: {
        host: process.env.CACHE_HOST || 'localhost',
        port: parseInt(process.env.CACHE_PORT || '6379'),
    },
    email: {
        user: process.env.EMAIL_USER!,
        password: process.env.EMAIL_PASSWORD!,
        from: process.env.EMAIL_FROM || 'talent_hub@noreply.com',
    },
    aws: {
        region: process.env.AWS_REGION!,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        ses: {
            from: process.env.AWS_SES_FROM!,
        },
    },
    emailConfirmationUrl: process.env.EMAIL_CONFIRMATION_URL!,
    company: {
        maxGallerySize: parseInt(process.env.COMPANY_MAX_GALLERY_SIZE || '5'),
    }
};
