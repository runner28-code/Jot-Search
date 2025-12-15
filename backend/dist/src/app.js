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
const utils_1 = require("./utils");
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
};
const logger = (req, res, next) => {
    let current_datetime = new Date();
    let formatted_date = current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();
    const method = req.method;
    const url = req.url;
    const status = -res.statusCode;
    const start = process.hrtime();
    const durationInMs = getActualRequestDurationInMs(start);
    const log = `[${formatted_date}] ${method}:${url} ${status} ${durationInMs.toLocaleString()} ms`;
    console.log(log);
    next();
};
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(body_parser_1.default.json());
app.use(logger);
app.use(express_1.default.static("uploads"));
app.use((0, cors_1.default)());
app.post("/api/upload", upload.single("file"), (req, res) => {
    const folder = req.body.type || "resumes";
    if (!ALLOWED_UPLOAD_FOLDERS.includes(folder)) {
        res.status(400).send({
            message: "Invalid folder",
        });
        return;
    }
    if (req.file) {
        res.json({
            result: true,
            file: `/${folder}/${req.file.filename}`,
        });
        return;
    }
    else {
        res.json({
            result: false,
        });
    }
});
app.get("/health", (req, res) => {
    res.status(200).send("Ok");
});
(0, routing_controllers_1.useExpressServer)(app, {
    controllers: [path_1.default.join(__dirname + "/controllers/*.ts")],
    authorizationChecker: (action) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = action.request.headers.authorization.split(" ")[1];
            const data = (0, jwtUtils_1.VerifyJwtToken)(token);
            if (data && data.email) {
                const user = yield (0, User_1.findUserByEmail)(data.email);
                if (user) {
                    action.request.user = user;
                    return true;
                }
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
    currentUserChecker: (action) => action.request.user,
});
app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
});
// Without the following method Express will not be able to serialize BigInts for responses
BigInt.prototype.toJSON = function () {
    return this.toString();
};
