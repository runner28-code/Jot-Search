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
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobsList = exports.updateJob = exports.inferDatasetById = exports.getAppliedJobsByUser = exports.createJob = void 0;
const Common_1 = require("../types/Common");
const Job_1 = require("../types/Job");
const db_1 = __importDefault(require("../utils/db"));
const createJob = (job) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobError = validateJob(job);
        if (jobError) {
            throw new Error(jobError);
        }
        const sanitizedJob = sanitizeJob(job);
        const newJob = yield db_1.default.job.create({
            data: Object.assign(Object.assign({}, sanitizedJob), { datasource: sanitizedJob === null || sanitizedJob === void 0 ? void 0 : sanitizedJob.datasource }),
        });
        return {
            result: true,
            data: newJob,
        };
    }
    catch (err) {
        console.error(err);
        return {
            result: false,
            error: err,
        };
    }
});
exports.createJob = createJob;
// TODO: Figure out what we want to make required
const validateJob = (job) => {
    return undefined;
