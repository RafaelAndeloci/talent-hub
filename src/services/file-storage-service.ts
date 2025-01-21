import config from '../config/environment';

export type FileStorageService = {
  upload({
    fileStream,
    fileName,
    contentType,
  }: {
    fileStream: NodeJS.ReadableStream;
    fileName: string;
    contentType: string;
  }): Promise<string>;
  delete(fileName: string): Promise<void>;
};

const fileStorageService: FileStorageService = {
  async upload({
    fileStream,
    fileName,
    contentType,
  }: {
    fileStream: NodeJS.ReadableStream;
    fileName: string;
    contentType: string;
  }) {
    return Promise.resolve(fileName);
  },

  async delete(fileName: string) {
    // Delete file from S3
    Promise.resolve();
  },
};

export default fileStorageService;
