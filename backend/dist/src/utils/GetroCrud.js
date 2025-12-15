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
exports.saveJobs = exports.getCompanies = exports.saveMembers = exports.saveCompanies = void 0;
const db_1 = __importDefault(require("./db"));
const saveCompanies = (companies) => __awaiter(void 0, void 0, void 0, function* () {
    const expludeFields = ['organization_careers_pages', 'managers', 'topics'];
    try {
        for (const company of companies) {
            try {
                console.log(`Savng company with ID = ${company.id}`);
                const existing = yield db_1.default.getroCompany.findFirst({
                    where: {
                        id: company.id,
                    },
                });
                if (existing) {
                    console.log(`Company with ID: ${company.id} exists`);
                    return -1;
                }
                const companyData = Object.assign({}, company);
                Object.keys(companyData).forEach((key) => {
                    if (expludeFields.includes(key)) {
                        delete companyData[key];
                    }
                });
                const newCompany = yield db_1.default.getroCompany.create({
                    data: companyData,
                });
                console.log(`Saved company with ID = ${company.id} successfully`);
            }
            catch (error) {
                console.log(error);
                console.log(`ERROR: while saving company with ID = ${company.id}`);
            }
        }
        ;
        return { result: true };
    }
    catch (error) {
        console.log(error);
        return { result: false, error };
    }
});
exports.saveCompanies = saveCompanies;
const saveMembers = (members) => __awaiter(void 0, void 0, void 0, function* () {
    const expludeFields = ['user_talent_collection', 'referrals_given', 'referrals_received', 'opportunity_types', 'mentorship'];
    try {
        for (const member of members) {
            try {
                console.log(`Savng Getro Member with ID = ${member.id}`);
                const existing = yield db_1.default.getroMember.findFirst({
                    where: {
                        id: member.id,
                    },
                });
                if (existing) {
                    console.log(`Job with ID: ${member.id} exists`);
                    return -1;
                }
                const jobData = Object.assign({}, member);
                Object.keys(jobData).forEach((key) => {
                    if (expludeFields.includes(key)) {
                        delete jobData[key];
                    }
                });
                const newJob = yield db_1.default.getroMember.create({
                    data: jobData,
                });
                console.log(`Saved Getro Member with ID = ${member.id} successfully`);
            }
            catch (error) {
                console.log(error);
                console.log(`ERROR: while saving Member with ID = ${member.id}`);
            }
        }
        ;
        return { result: true };
    }
    catch (error) {
        console.log(error);
        return { result: false, error };
    }
});
exports.saveMembers = saveMembers;
const getCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield db_1.default.getroCompany.findMany();
    return jobs;
});
exports.getCompanies = getCompanies;
const saveJobs = (jobs) => __awaiter(void 0, void 0, void 0, function* () {
    const expludeFields = ['organization', 'employment_types'];
    console.log('----- jobs', jobs);
    try {
        for (const job of jobs) {
            try {
                console.log(`Savng Getro Job with ID = ${job.id}`);
                const existing = yield db_1.default.getroJobInfo.findFirst({
                    where: {
                        id: job.id,
                    },
                });
                if (existing) {
                    console.log(`Job with ID: ${job.id} exists`);
                    return -1;
                }
                const jobData = Object.assign({}, job);
                Object.keys(jobData).forEach((key) => {
                    if (expludeFields.includes(key)) {
                        delete jobData[key];
                    }
                });
                const newJob = yield db_1.default.getroJobInfo.create({
                    data: jobData,
                });
                console.log(`Saved Getro Job with ID = ${job.id} successfully`);
            }
            catch (error) {
                console.log(error);
                console.log(`ERROR: while saving Job with ID = ${job.id}`);
            }
        }
        ;
        return { result: true };
    }
    catch (error) {
        console.log(error);
        return { result: false, error };
    }
});
exports.saveJobs = saveJobs;
