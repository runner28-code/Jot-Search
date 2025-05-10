"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    port: process.env.PORT,
    authSecret: process.env.AUTH_SECRET,
    fileUploadSize: process.env.FILE_UPLOAD_SIZE,
    getroEmail: process.env.GETRO_EMAIL,
