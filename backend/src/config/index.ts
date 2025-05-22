import "dotenv/config";

const config = {
  port: process.env.PORT,
  projectId: process.env.PROJECT_ID,
  fileUploadSize: process.env.FILE_UPLOAD_SIZE,

  getroEmail: process.env.GETRO_EMAIL,
  getroPassword: process.env.GETRO_PASSWORD,

  bullhornClientID: process.env.BULLHORN_CLIENT_ID,
