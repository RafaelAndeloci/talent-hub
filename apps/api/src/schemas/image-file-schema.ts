import { z } from 'zod';
import { config } from '../config/environment';
import { buildFileSchema } from '../utils/schemas';

export const FileImageSchema = z.object({
    file: buildFileSchema({
        maxSize: config.fileStorage.images.maxSize,
        allowedMimeTypes: config.fileStorage.images.allowedTypes,
    }).strict(),
});
