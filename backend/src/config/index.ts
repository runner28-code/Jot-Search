import "dotenv/config";

const config = {
  port: process.env.PORT,
  authSecret: process.env.AUTH_SECRET,
  fileUploadSize: process.env.FILE_UPLOAD_SIZE,
