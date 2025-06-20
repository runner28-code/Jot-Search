"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    port: process.env.PORT,
    projectId: process.env.PROJECT_ID,
    authSecret: process.env.AUTH_SECRET,
// Temp comment
    fileUploadSize: process.env.FILE_UPLOAD_SIZE,
    getroEmail: process.env.GETRO_EMAIL,
    getroPassword: process.env.GETRO_PASSWORD,
    bullhornClientID: process.env.BULLHORN_CLIENT_ID,
