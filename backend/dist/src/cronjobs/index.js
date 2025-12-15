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
const node_cron_1 = __importDefault(require("node-cron"));
const BullhornService_1 = require("../services/BullhornService");
const GetroService_1 = require("../services/GetroService");
const utils_1 = require("../utils");
const setupCronJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('*** Running all crons ***');
    node_cron_1.default.schedule('0 */2 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, utils_1.consoleLog)('/// CRON_JOB_STARTED: BULLHORN_GET_COMPANIES');
            yield (yield BullhornService_1.BullhornService.getClient()).getCompanies(false, 50);
        }
        catch (error) {
            (0, utils_1.consoleLog)(error);
        }
        (0, utils_1.consoleLog)('/// CRON_JOB_ENDED: BULLHORN_GET_COMPANIES');
    }));
    node_cron_1.default.schedule("0 */2 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, utils_1.consoleLog)("/// CRON_JOB_STARTED: BULLHORN_GET_JOBS");
            yield (yield BullhornService_1.BullhornService.getClient()).getJobs(false, 50);
        }
        catch (error) {
            (0, utils_1.consoleLog)(error);
        }
        (0, utils_1.consoleLog)("/// CRON_JOB_ENDED: BULLHORN_GET_JOBS");
    }));
    node_cron_1.default.schedule('0 */8 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, utils_1.consoleLog)('/// CRON_JOB_STARTED: BULLHORN_GET_CLIENTCONTACTS');
            yield (yield BullhornService_1.BullhornService.getClient()).getClientContacts(false, 50);
        }
        catch (error) {
            (0, utils_1.consoleLog)(error);
        }
        (0, utils_1.consoleLog)('/// CRON_JOB_ENDED: BULLHORN_GET_CLIENTCONTACTS');
    }));
    node_cron_1.default.schedule('0 */12 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, utils_1.consoleLog)('/// CRON_JOB_STARTED: BULLHORN_GET_CANDIDATES');
            yield (yield BullhornService_1.BullhornService.getClient()).getCandidates(false, 50);
        }
        catch (error) {
            (0, utils_1.consoleLog)(error);
        }
        (0, utils_1.consoleLog)('/// CRON_JOB_ENDED: BULLHORN_GET_CANDIDATES');
    }));
    node_cron_1.default.schedule('0 */12 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, utils_1.consoleLog)('/// CRON_JOB_STARTED: BULLHORN_GET_LEADS');
            yield (yield BullhornService_1.BullhornService.getClient()).getLeads(false, 50);
        }
        catch (error) {
            (0, utils_1.consoleLog)(error);
        }
        (0, utils_1.consoleLog)('/// CRON_JOB_ENDED: BULLHORN_GET_LEADS');
    }));
    node_cron_1.default.schedule('0 */2 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, utils_1.consoleLog)('/// CRON_JOB_STARTED: GETRO_GET_COMPANIES');
            yield (yield GetroService_1.GetroService.getClient()).getCompanies(false, 50);
        }
        catch (error) {
            (0, utils_1.consoleLog)(error);
        }
        (0, utils_1.consoleLog)('/// CRON_JOB_ENDED: GETRO_GET_COMPANIES');
    }));
    node_cron_1.default.schedule('0 */8 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, utils_1.consoleLog)('/// CRON_JOB_STARTED: GETRO_GET_JOBS');
            yield (yield GetroService_1.GetroService.getClient()).getJobs(false, 50);
        }
        catch (error) {
            (0, utils_1.consoleLog)(error);
        }
        (0, utils_1.consoleLog)('/// CRON_JOB_ENDED: GETRO_GET_JOBS');
    }));
    node_cron_1.default.schedule('0 */16 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, utils_1.consoleLog)('/// CRON_JOB_STARTED: GETRO_GET_MEMBERS');
            yield (yield GetroService_1.GetroService.getClient()).getMembers(false, 50);
        }
        catch (error) {
            (0, utils_1.consoleLog)(error);
        }
        (0, utils_1.consoleLog)('/// CRON_JOB_ENDED: GETRO_GET_MEMBERS');
    }));
    node_cron_1.default.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, utils_1.consoleLog)('/// CRON_JOB_STARTED: BULLHORN_GET_NEW_JOB_SUBSCRIPTION');
            yield (yield BullhornService_1.BullhornService.getClient()).getJobPostSubscription(10);
        }
        catch (error) {
            (0, utils_1.consoleLog)(error);
        }
        (0, utils_1.consoleLog)('/// CRON_JOB_ENDED: BULLHORN_GET_NEW_JOB_SUBSCRIPTION');
    }));
});
setupCronJobs();
