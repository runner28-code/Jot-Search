import "dotenv/config";

const config = {
  port: process.env.PORT,
  projectId: process.env.PROJECT_ID,
  authSecret: process.env.AUTH_SECRET,
  fileUploadSize: process.env.FILE_UPLOAD_SIZE,

  getroEmail: process.env.GETRO_EMAIL,
  getroPassword: process.env.GETRO_PASSWORD,

  bullhornClientID: process.env.BULLHORN_CLIENT_ID,
  bullhornApiUsername: process.env.BULLHORN_API_USERNAME,
