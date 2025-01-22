import { Readable } from 'stream';
import config from '../config/environment';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3ClientConfig,
  CreateBucketCommand,
} from '@aws-sdk/client-s3';

const {
  bucket: {
    exposeUrl,
    serviceUrl,
    secretAccessKey,
    accessKeyId,
    region,
    defaultBucket,
  },
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

type UploadFileArgs = {
  key: string;
  bucket?: string;
  file: Buffer | Readable;
  contentType: string;
};

type DeleteFileArgs = {
  key: string;
  bucket?: string;
};

type GetFileStreamArgs = {
  key: string;
  bucket?: string;
};

interface FileStorageService {
  upload(args: UploadFileArgs): Promise<string>;
  delete(args: DeleteFileArgs): Promise<void>;
  getFileStream(
    args: GetFileStreamArgs,
  ): Promise<{ contentType: string; stream: Readable }>;
}

const createBucketIfNotExists = async (bucket: string) => {
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
};

const fileStorageService: FileStorageService = {
  async upload({ key, bucket, file, contentType }) {
    bucket = bucket || defaultBucket;

    await createBucketIfNotExists(bucket);

    const s3Bucket = await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket || defaultBucket,
        BucketKeyEnabled: true,
        Key: key,
        Body: file,
        ContentType: contentType,
      }),
    );

    return `${exposeUrl}/${key}`;
  },

  async delete({ key, bucket }) {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucket || defaultBucket,
        Key: key,
      }),
    );
  },

  async getFileStream({ key, bucket }) {
    const { Body, ContentType } = await s3Client.send(
      new GetObjectCommand({
        Bucket: bucket || defaultBucket,
        Key: key,
      }),
    );
    if (!Body) {
      throw new Error('File not found');
    }

    const stream: ReadableStream = Body.transformToWebStream();
    return { contentType: ContentType || '', stream: Readable.from(stream) };
  },
};

export default fileStorageService;
