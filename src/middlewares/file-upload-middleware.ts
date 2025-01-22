import multer from 'multer';
import path from 'path';
import fs from 'fs';
import config from '../config/environment';

const storage = multer.memoryStorage();

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

export const singleFileUpload = upload.single('file');

export default upload;
