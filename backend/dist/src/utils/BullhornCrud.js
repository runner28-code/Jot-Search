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
exports.migrateJobInTPP = exports.migrateUserInTPP = exports.saveLeads = exports.saveCandidates = exports.saveClientContacts = exports.saveBullhornJobs = exports.saveCompanies = void 0;
const BigQueryService_1 = require("../services/BigQueryService");
const Common_1 = require("../types/Common");
const _1 = require("./");
const parseEntities_1 = require("./parseEntities");
const db_1 = __importDefault(require("./db"));
const saveCompanies = (companies) => __awaiter(void 0, void 0, void 0, function* () {
    // Update existing database to remove https and unneccessary route path.
    // Keep it for now.
    // const result = await db.company.findMany({
    //   where: {
    //     companyURL: {
    //       not: null
    //     }
    //   }
    // });
    // for (const item of result) {
    //   await db.company.update({
    //     where: {
    //       id: item.id,
    //     },
    //     data: {
    //       companyURL: item.companyURL ? item.companyURL.replace(/^http:\/\/|https:\/\//, '').split('/')[0].replace(/^www\./, '') : null
    //     }
    //   })
    // }
    // return { result: false };
    const expludeFields = [
        "address",
        "billingAddress",
        "_score",
        "notes",
        "dateAdded",
        "dateLastModified",
    ];
    try {
        for (const company of companies) {
            try {
                console.log(`Savng company with ID = ${company.id}`, company);
                const address = yield db_1.default.address.create({
                    data: company.address,
                });
                const existing = yield db_1.default.company.findFirst({
                    where: {
                        externalID: company.id,
                    },
                });
                if (existing) {
                    console.log(`Company with ID: ${company.id} exists`);
                    return -1;
                }
                const companyData = Object.assign({ addressId: address.id }, company);
                Object.keys(companyData).forEach((key) => {
                    if (expludeFields.includes(key)) {
                        delete companyData[key];
                    }
                });
                companyData.companyURL = companyData.companyURL ? companyData.companyURL.replace(/^http:\/\/|https:\/\//, '').split('/')[0].replace(/^www\./, '') : null;
                const newCompany = yield db_1.default.company.create({
                    data: companyData,
                });
                console.log(`Saved company with ID = ${company.id} successfully`);
            }
            catch (error) {
                console.log(error.message);
                console.log(`ERROR: while saving company with ID = ${company.id}`);
            }
        }
        return { result: true };
    }
    catch (error) {
        console.log(error.message);
        return { result: false, error };
    }
});
exports.saveCompanies = saveCompanies;
const saveBullhornJobs = (jobs) => __awaiter(void 0, void 0, void 0, function* () {
    const excludeFields = [
        "address",
        "location",
        "_score",
        "publicDescription",
        "clientCorporation",
        "dateAdded",
        "dateClosed",
        "date_end",
        "dateLastExported",
        "dateLastModified",
        "dateLastPublished",
        "startDate",
        "skills",
    ];
    try {
        for (const job of jobs) {
            try {
                console.log(`Savng job with ID = ${job.id}`);
                const parsedJob = (0, parseEntities_1.parseBullhornJobToMain)(job);
                if (parsedJob) {
                    // await migrateJobInTPP(parsedJob);
                }
                const existing = yield db_1.default.job.findFirst({
                    where: {
                        externalId: `bl-${job.id}`,
                    },
                });
                if (existing) {
                    console.log(`Job with ID: ${job.id} exists`);
                    return -1;
                }
                const jobData = Object.assign({}, job);
                Object.keys(jobData).forEach((key) => {
                    if (excludeFields.includes(key)) {
                        delete jobData[key];
                    }
                });
                const newJob = yield db_1.default.job.create({
                    data: jobData,
                });
                console.log(`Saved job with ID = ${job.externalId} successfully`);
            }
            catch (error) {
                console.log(error.message);
                console.log(`ERROR: while saving job with ID = ${job.externalId}`);
            }
        }
        return { result: true };
    }
    catch (error) {
        console.log(error.message);
        return { result: false, error };
    }
});
exports.saveBullhornJobs = saveBullhornJobs;
const saveClientContacts = (contacts) => __awaiter(void 0, void 0, void 0, function* () {
    const expludeFields = ["address", "location", "_score"];
    try {
        for (const contact of contacts) {
            try {
                console.log(`\nSavng ClientContact with ID = ${contact.id}`);
                const existing = yield db_1.default.clientContact.findFirst({
                    where: {
                        externalID: contact.id,
                    },
                });
                if (existing) {
                    console.log(`ClientContact with ID: ${contact.id} exists`);
                    return -1;
                }
                const contactData = Object.assign({}, contact);
                Object.keys(contactData).forEach((key) => {
                    if (expludeFields.includes(key)) {
                        delete contactData[key];
                    }
                });
                const newContact = yield db_1.default.clientContact.create({
                    data: contactData,
                });
                console.log(`Saved ClientContact with ID = ${contact.id} successfully`);
            }
            catch (error) {
                console.log(error.message);
                console.log(`ERROR: while saving ClientContact with ID = ${contact.id}`);
            }
        }
        return { result: true };
    }
    catch (error) {
        console.log(error.message);
        return { result: false, error };
    }
});
exports.saveClientContacts = saveClientContacts;
const saveCandidates = (candidates) => __awaiter(void 0, void 0, void 0, function* () {
    const expludeFields = ["address", "_score"];
    try {
        for (const candidate of candidates) {
            try {
                console.log(`\n\nSavng Candidate with ID = ${candidate.id}`);
                const parsedUser = (0, parseEntities_1.parseBullhornCandidateToUser)(candidate);
                if (parsedUser) {
                    // await migrateUserInTPP(parsedUser);
                }
                const existing = yield db_1.default.candidate.findFirst({
                    where: {
                        externalId: candidate.id,
                    },
                });
                if (existing) {
                    console.log(`Candidate with ID: ${candidate.id} exists`);
                    continue;
                }
                const candidateData = Object.assign({}, candidate);
                Object.keys(candidateData).forEach((key) => {
                    if (expludeFields.includes(key)) {
                        delete candidateData[key];
                    }
                });
                const newCandidate = yield db_1.default.candidate.create({
                    data: candidateData,
                });
                console.log(`Saved Candidate with ID = ${candidate.id} successfully`);
            }
            catch (error) {
                console.log(error.message);
                console.log(`ERROR: while saving Candidate with ID = ${candidate.id}`);
            }
        }
        return { result: true };
    }
    catch (error) {
        console.log(error.message);
        return { result: false, error };
    }
});
exports.saveCandidates = saveCandidates;
const saveLeads = (leads) => __awaiter(void 0, void 0, void 0, function* () {
    const expludeFields = ["address", "_score"];
    try {
        for (const lead of leads) {
            try {
                console.log(`Savng Lead with ID = ${lead.id}`);
                const existing = yield db_1.default.lead.findFirst({
                    where: {
                        externalId: lead.id,
                    },
                });
                if (existing) {
                    console.log(`Lead with ID: ${lead.id} exists`);
                    return -1;
                }
                const leadData = Object.assign({}, lead);
                Object.keys(leadData).forEach((key) => {
                    if (expludeFields.includes(key)) {
                        delete leadData[key];
                    }
                });
                const newLead = yield db_1.default.lead.create({
                    data: leadData,
                });
                console.log(`Saved Lead with ID = ${lead.id} successfully`);
            }
            catch (error) {
                console.log(error.message);
                console.log(`ERROR: while saving Lead with ID = ${lead.id}`);
            }
        }
        return { result: true };
    }
    catch (error) {
        console.log(error.message);
        return { result: false, error };
    }
});
exports.saveLeads = saveLeads;
const migrateUserInTPP = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existing = yield db_1.default.candidate.findFirst({
            where: {
                externalId: data.externalId,
            },
        });
        if (existing) {
            console.log(`Migration Failed: Bullhorn User (bh_id=${data.externalId}) is already migratd`);
            return;
        }
        yield db_1.default.candidate.create({ data });
        console.log(`Saved Bullhorn User (bh_id=${data.externalId}) successfully`);
    }
    catch (error) {
        console.log(error.message);
        console.log(`ERROR: Migration Failed Bullhorn User (bh_id=${data.externalId})`);
    }
});
exports.migrateUserInTPP = migrateUserInTPP;
const migrateJobInTPP = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Migrating Job from Bullhorn: bh_id = ${data.externalId}`);
        const condition = `externalId = '${data.externalId}'`;
        const dataset = Common_1.DATASET_MAIN;
        const table = Common_1.Tables.JOBS;
        const id = (0, _1.genUUID)();
        const existing = yield (0, _1.isExistByCondition)(condition, dataset, table);
        if (existing) {
            console.log(`Migration Failed: Bullhorn Job (bh_id=${data.externalId}) is already migrated`);
            return;
        }
        const keys = Object.keys(data);
        const values = keys.map((k) => `"""${data[k]}"""`);
        keys.unshift("id");
        values.unshift(`"""${id}"""`);
        const query = `
            INSERT INTO \`${dataset}.${table}\` (${keys.join(", ")})
            VALUES (${values.join(", ")})
        `;
        // console.log(query);
        const options = {
            query: query,
            location: "US",
        };
        const [bgJob] = yield BigQueryService_1.BigQueryService.getClient().createQueryJob(options);
        yield bgJob.getQueryResults();
        console.log(`Migrated Bullhorn Job (bh_id=${data.externalId}) successfully`);
    }
    catch (error) {
        console.log(error.message);
        console.log(`ERROR: Migration Failed Bullhorn Job (bh_id=${data.externalId})`);
    }
});
exports.migrateJobInTPP = migrateJobInTPP;
