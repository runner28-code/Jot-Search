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
exports.determineCondition = exports.getFilterConditions = exports.justifyData = exports.fileUploadOptions = exports.checkForJobFilter = exports.genUUID = exports.getDataSource = exports.sleep = exports.consoleLog = exports.isExistByCondition = exports.isExistByID = void 0;
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../config"));
const BigQueryService_1 = require("../services/BigQueryService");
const Common_1 = require("../types/Common");
const constant_1 = require("./constant");
const isExistByID = (id, datset, table) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
            SELECT * FROM \`${datset}.${table}\`
            WHERE id=${id}
        `;
        const options = {
            query: query,
            location: 'US',
        };
        const [job] = yield BigQueryService_1.BigQueryService.getClient().createQueryJob(options);
        const [res] = yield job.getQueryResults();
        if (res && res.length > 0 && `'${res[0].id}'` === id) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return true;
    }
});
exports.isExistByID = isExistByID;
const isExistByCondition = (condition, datset, table) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
            SELECT * FROM \`${datset}.${table}\`
            WHERE ${condition}
        `;
        const options = {
            query: query,
            location: 'US',
        };
        const [job] = yield BigQueryService_1.BigQueryService.getClient().createQueryJob(options);
        const [res] = yield job.getQueryResults();
        if (res && res.length > 0) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return true;
    }
});
exports.isExistByCondition = isExistByCondition;
const consoleLog = (message, newLine = true) => {
    console.log(`${newLine ? '\n' : ''}${message}`);
};
exports.consoleLog = consoleLog;
const sleep = (ms) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => setTimeout(resolve, ms));
});
exports.sleep = sleep;
const getDataSource = (id) => {
    const prefix = id.slice(0, 2);
    if (prefix === 'bl')
        return Common_1.DataSource.BULLHORN;
    if (prefix === 'gt')
        return Common_1.DataSource.GETRO;
    return Common_1.DataSource.UNKNOWN;
};
exports.getDataSource = getDataSource;
const genUUID = () => (0, uuid_1.v4)();
exports.genUUID = genUUID;
const checkForJobFilter = (title, location) => {
    if (title.match(constant_1.JOB_EXCLUDE_KEYS_REGEX))
        return false;
        return true;
    return false;
