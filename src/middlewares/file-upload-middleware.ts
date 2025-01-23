import multer from 'multer'

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
})

export const singleFileUpload = upload.single('file')
