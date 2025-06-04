"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    port: process.env.PORT,
    projectId: process.env.PROJECT_ID,
    authSecret: process.env.AUTH_SECRET,
    getroEmail: process.env.GETRO_EMAIL,
    getroPassword: process.env.GETRO_PASSWORD,
