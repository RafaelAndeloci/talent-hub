import { Readable } from 'stream';
import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
    CreateBucketCommand,
} from '@aws-sdk/client-s3';
import { config } from '../config/environment';

const {
    bucket: { exposeUrl, serviceUrl, secretAccessKey, accessKeyId, region, defaultBucket },
} = config;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    endpoint: serviceUrl,
});

export class FileStorageService {
    public static async upload({
        key,
        bucket,
        file,
        contentType,
    }: {
        key: string;
        bucket?: string;
        file: Buffer | Readable;
        contentType: string;
    }) {
        bucket = bucket || defaultBucket;

        await FileStorageService.createBucketIfNotExists(bucket);

        await s3Client.send(
            new PutObjectCommand({
                Bucket: bucket || defaultBucket,
                BucketKeyEnabled: true,
                Key: key,
                Body: file,
                ContentType: contentType,
            }),
        );

        return `${exposeUrl}/${key}`;
    }

    public static async deleteFile({ key, bucket }: { key: string; bucket?: string }) {
        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: bucket || defaultBucket,
                Key: key,
            }),
        );
    }

    public static async getFileStream({ key, bucket }: { key: string; bucket?: string }) {
        const { Body, ContentType } = await s3Client.send(
            new GetObjectCommand({
                Bucket: bucket || defaultBucket,
                Key: key,
            }),
        );
        if (!Body) {
            throw new Error('File not found');
        }

        const stream: Readable = Body as Readable;
        return { contentType: ContentType || '', stream };
    }

    private static async createBucketIfNotExists(bucket: string) {
        try {
            await s3Client.send(
                new CreateBucketCommand({
                    Bucket: bucket,
                }),
            );
        } catch (error) {
            if ((error as any).name === 'BucketAlreadyExists') {
                return;
            }

            throw error;
        }
    }
}
