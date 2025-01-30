import { Readable } from 'stream';
import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
    S3ClientConfig,
    CreateBucketCommand,
} from '@aws-sdk/client-s3';
import { config } from '../config/environment';

const {
    bucket: { exposeUrl, serviceUrl, secretAccessKey, accessKeyId, region, defaultBucket },
} = config;

const credentials: S3ClientConfig = {
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    endpoint: serviceUrl,
};

const s3Client = new S3Client(credentials);

const createBucketIfNotExists = async(bucket: string) => {
    try {
        await s3Client.send(
            new CreateBucketCommand({
                Bucket: bucket,
            }),
        );
    } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any).name === 'BucketAlreadyExists') {
            return;
        }

        throw error;
    }
};

type UploadFileArgs = {
    key: string;
    bucket?: string;
    file: Buffer | Readable;
    contentType: string;
};

const upload = async({ key, bucket, file, contentType }: UploadFileArgs) => {
    bucket = bucket || defaultBucket;

    await createBucketIfNotExists(bucket);

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
};

type DeleteFileArgs = {
    key: string;
    bucket?: string;
};

const deleteFile = async({ key, bucket }: DeleteFileArgs) => {
    await s3Client.send(
        new DeleteObjectCommand({
            Bucket: bucket || defaultBucket,
            Key: key,
        }),
    );
};

type GetFileStreamArgs = {
    key: string;
    bucket?: string;
};

const getFileStream = async({ key, bucket }: GetFileStreamArgs) => {
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
};

export const fileStorageService = {
    upload,
    deleteFile,
    getFileStream,
};
