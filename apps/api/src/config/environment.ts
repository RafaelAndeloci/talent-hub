import { env as environment } from '@talent-hub/env';
import { newUUID } from '@talent-hub/shared';
import * as dotenv from 'dotenv';
import path from 'path';
import { Logger } from '../services/logging-service';

const env = environment.NODE_ENV || 'development';

try {
    const envPath = path.resolve(__dirname, `../../../../.env`);

    const { error } = dotenv.config({ path: envPath });

    if (error) {
        Logger.error(`Error loading environment variables: ${error.message}`);
        process.exit(1);
    }
} catch (error) {
    Logger.error(`Error loading environment variables: ${(error as unknown as Error).message}`);
    process.exit(1);
}

export const config = {
    env,
    api: {
        port: parseInt(environment.PORT || '3000'),
        host: environment.HOST || 'localhost',
        docEnabled: environment.API_DOC_ENABLED === 'true',
        basePath: '/api',
    },
    database: {
        host: environment.DB_HOST || 'localhost',
        port: parseInt(environment.DB_PORT || '5432'),
        user: environment.DB_USER || 'postgres',
        password: environment.DB_PASSWORD || 'postgres',
        database: environment.DB_NAME || 'postgres',
        logEnabled: environment.DB_LOG_ENABLED === 'true',
        pool: {
            min: parseInt(environment.DB_POOL_MIN || '0'),
            max: parseInt(environment.DB_POOL_MAX || '5'),
        },
        sync: {
            enabled: environment.DB_SYNC_ENABLED === 'true',
            force: environment.DB_SYNC_FORCE === 'true',
            alter: environment.DB_SYNC_ALTER === 'true',
        },
    },
    security: {
        enabled: environment.JWT_ENABLED === 'true',
        secret: environment.JWT_SECRET || 'secret',
        audience: environment.JWT_AUDIENCE || 'audience',
        issuer: environment.JWT_ISSUER || 'issuer',
        expiresIn: parseFloat(environment.JWT_EXPIRES_IN || '1'),
        password: {
            resetExpiration: parseInt(environment.PASSWORD_RESET_EXPIRATION || '1'),
            hashSalt: environment.PASSWORD_HASH_SALT || 'salt',
            resetPageUrl: environment.PASSWORD_RESET_PAGE_URL || 'reset',
        },
    },
    fileStorage: {
        cv: {
            allowedTypes: environment.ALLOWED_CV_TYPES!.split(','),
            maxSize: parseInt(environment.MAX_CV_SIZE!),
        },
        images: {
            allowedTypes: environment.ALLOWED_IMAGE_TYPES!.split(','),
            maxSize: parseInt(environment.MAX_IMAGE_SIZE!),
        },
    },
    sysAdmin: {
        id: environment.SYS_ADMIN_ID || newUUID(),
        email: environment.SYS_ADMIN_EMAIL || 'pedro.lima47@fatec.sp.gov.br',
        password: environment.SYS_ADMIN_PASSWORD || 'admin123',
        username: environment.SYS_ADMIN_USERNAME || 'admin',
    },
    bucket: {
        accessKeyId: environment.BUCKET_ACCESS_KEY_ID!,
        secretAccessKey: environment.BUCKET_SECRET_ACCESS_KEY!,
        defaultBucket: environment.BUCKET_DEFAULT!,
        serviceUrl: environment.BUCKET_SERVICE_URL!,
        region: environment.BUCKET_REGION!,
        exposeUrl: environment.BUCKET_EXPOSE_URL!,
    },
    cache: {
        host: environment.CACHE_HOST || 'localhost',
        port: parseInt(environment.CACHE_PORT || '6379'),
    },
    email: {
        user: environment.EMAIL_USER!,
        password: environment.EMAIL_PASSWORD!,
        from: environment.EMAIL_FROM || 'talent_hub@noreply.com',
    },
    aws: {
        region: environment.AWS_REGION!,
        accessKeyId: environment.AWS_ACCESS_KEY_ID!,
        secretAccessKey: environment.AWS_SECRET_ACCESS_KEY!,
        ses: {
            from: environment.AWS_SES_FROM!,
        },
    },
    emailConfirmationUrl: environment.EMAIL_CONFIRMATION_URL!,
    company: {
        maxGallerySize: parseInt(environment.COMPANY_MAX_GALLERY_SIZE || '5'),
    },
};
