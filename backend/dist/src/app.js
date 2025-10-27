"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const routing_controllers_1 = require("routing-controllers");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const jwtUtils_1 = require("./utils/jwtUtils");
const User_1 = require("./services/User");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const ALLOWED_UPLOAD_FOLDERS = ["resumes", "avatars"];
const multerStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.body.type || "resumes";
        const path = __dirname + `/../uploads/${folder}`;
        console.log("upload path: ", path);
        fs_1.default.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        console.log(file);
        const fileName = (0, utils_1.genUUID)() + path_1.default.extname(file.originalname);
        cb(null, fileName);
    },
});
const upload = (0, multer_1.default)({ storage: multerStorage });
const getActualRequestDurationInMs = (start) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
