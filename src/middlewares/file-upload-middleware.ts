import multer from 'multer'

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const singleFileUpload = upload.single('file') as any
