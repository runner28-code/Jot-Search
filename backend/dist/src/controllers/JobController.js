"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.normalizeFilters = exports.JobController = void 0;
const client_1 = require("@prisma/client");
const routing_controllers_1 = require("routing-controllers");
const BigQueryService_1 = require("../services/BigQueryService");
const Job_1 = require("../services/Job");
const Common_1 = require("../types/Common");
const Getro_1 = require("../types/Getro");
const Job_2 = require("../types/Job");
const utils_1 = require("../utils");
const db_1 = __importDefault(require("../utils/db"));
const FieldMatch_1 = require("../utils/FieldMatch");
const MainCrud_1 = require("../utils/MainCrud");
const BullhornService_1 = require("../services/BullhornService");
let JobController = class JobController {
    searchJobByID(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const job = yield db_1.default.job.findFirst({
                    where: {
                        id,
                    },
                    include: {
                        getroJobInfo: true,
                        company: true,
                    },
                });
                console.log({ job });
                if (job) {
                    return {
                        job: Object.assign(Object.assign(Object.assign({}, ((job === null || job === void 0 ? void 0 : job.getroJobInfo) || {})), job), { clientCorporation: (_a = job.company) === null || _a === void 0 ? void 0 : _a.name }),
                    };
                }
                else {
                    return null;
                }
            }
            catch (err) {
                console.error(err);
                return null;
            }
        });
    }
    runJob(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, utils_1.consoleLog)("/// BULLHORN_GET_JOBS");
                yield (yield BullhornService_1.BullhornService.getClient()).getJobs(false, 50);
                return { success: true };
            }
            catch (error) {
                (0, utils_1.consoleLog)(error);
                return { success: false, error };
            }
        });
    }
    searchByFilter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filters, fields, page, count, datasource } = body;
                const datasourceToEnum = {
                    main: client_1.Datasource.main,
                    bullhorn: client_1.Datasource.bullhorn,
                    getro: client_1.Datasource.getro,
                };
                const _datasource = datasource ? datasourceToEnum[datasource] : undefined;
                const _filters = (0, exports.normalizeFilters)(filters);
                const where = Object.assign({ datasource: _datasource }, _filters);
                const skip = (count || 0) * ((page - 1) || 0);
                const jobPromise = db_1.default.job.findMany({
                    where,
                    take: count,
                    skip: skip < 0 ? 0 : skip,
                    include: {
                        company: true,
                        category: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    }
                }); // TODO: assumes we are changing frontend to pass compatible fields and filters params
                const totalPromise = db_1.default.job.count({
                    where,
                });
                const [jobs, total] = yield Promise.all([jobPromise, totalPromise]);
                const companyURLs = jobs.filter(job => { var _a; return (_a = job.company) === null || _a === void 0 ? void 0 : _a.companyURL; })
                    .map((job) => job.company.companyURL);
                const getroCompanies = yield db_1.default.getroCompany.findMany({
                    select: {
                        domain: true,
                        logo_url: true,
                    },
                    where: {
                        domain: {
                            in: companyURLs
                        }
                    }
                });
                const extendedJobs = jobs.map((job) => {
                    var _a, _b;
                    const getroCompany = getroCompanies.find((gc) => { var _a; return gc.domain === ((_a = job.company) === null || _a === void 0 ? void 0 : _a.companyURL); });
                    if (getroCompany) {
                        job.company.logo = getroCompany.logo_url;
                    }
                    job.company_name = (_a = job.company) === null || _a === void 0 ? void 0 : _a.name;
                    job.company_logo = (_b = job.company) === null || _b === void 0 ? void 0 : _b.logo;
                    return job;
                });
                // console.log({ jobs });
                return {
                    jobs: extendedJobs,
                    total,
                    message: null,
                };
            }
            catch (error) {
                console.error(error);
                return {
                    message: error,
                };
            }
        });
    }
    getJobsByFilterFromMain(filters = [], fields, count, operator = "OR") {
        return __awaiter(this, void 0, void 0, function* () {
            const _filters = filters.filter((filter) => Job_2.ALLOWED_JOB_KEYS.has(filter.key));
            const filteredFields = fields === null || fields === void 0 ? void 0 : fields.filter((field) => Job_2.ALLOWED_JOB_KEYS.has(field));
            const alias = "main_jobs";
            const companyAlias = "company";
            const _fields = (filteredFields === null || filteredFields === void 0 ? void 0 : filteredFields.length)
                ? filteredFields.join(", ")
                : `${alias}.*, ${companyAlias}.bh_url as company_url, ${companyAlias}.name as company_name, ${companyAlias}.logo as company_logo`;
            const specialHandlers = {
                company_name: (_, value) => `LOWER(${companyAlias}.name) LIKE '%${value.toLowerCase()}%'`,
            };
            const condition = (0, utils_1.getFilterConditions)(_filters, operator, specialHandlers);
            const dataset = Common_1.DATASET_MAIN;
            const table = Common_1.Tables.JOBS;
            const _join = `
      LEFT JOIN \`${Common_1.DATASET_MAIN}.${Common_1.Tables.JOINED_COMPANIES}\` as ${companyAlias} 
      ON REPLACE(${alias}.companyId, "bh-", "bl-")  = ${companyAlias}.bh_id
      `;
            return yield BigQueryService_1.BigQueryService.selectQuery(dataset, table, _fields, count, condition, _join, alias);
        });
    }
    getJobsByFilterFromGetro(filters = [], fields, count, operator = "OR") {
        return __awaiter(this, void 0, void 0, function* () {
            const _filters = filters.filter((filter) => Getro_1.ALLOWED_GETRO_FILTERS.has(filter.key));
            const filteredFields = fields === null || fields === void 0 ? void 0 : fields.filter((field) => Getro_1.ALLOWED_GETRO_FILTERS.has(field));
            const _fields = (filteredFields === null || filteredFields === void 0 ? void 0 : filteredFields.length) ? filteredFields.join(", ") : "*";
            const condition = (0, utils_1.getFilterConditions)(_filters, operator);
            const dataset = Common_1.DATASET_GETRO;
            const table = Common_1.Tables.JOBS;
            return (yield BigQueryService_1.BigQueryService.selectQuery(dataset, table, _fields, count, condition));
        });
    }
    getJobsByFilterFromBullhorn(filters, fields, page, count, operator = "OR") {
        return __awaiter(this, void 0, void 0, function* () {
            if (filters === null || filters === void 0 ? void 0 : filters.every((opt) => FieldMatch_1.JobFilter.bullhorn[opt.key] != null)) {
                const _dataset = Common_1.DATASET_BULLHORN;
                const _table = Common_1.Tables.JOBS;
                const _specialHandlers = {
                    clientCorporationID: (key, value) => `${key} = REPLACE("${value}", "bl-", "")`,
                };
                const _filters = filters.map((filter) => ({
                    key: FieldMatch_1.JobFilter.bullhorn[filter.key],
                    value: filter.value,
                }));
                const _condition = (0, utils_1.getFilterConditions)(_filters, operator, _specialHandlers);
                const alias = "jobs";
                const companyAlias = "company";
                const _fields = (fields === null || fields === void 0 ? void 0 : fields.length)
                    ? fields.join(", ")
                    : `${alias}.*, ${companyAlias}.bh_url as company_url, ${companyAlias}.name as company_name, ${companyAlias}.logo as company_logo, publishedCategory.id AS publishedCategoryID`;
                const _join = `
        LEFT JOIN \`${Common_1.DATASET_MAIN}.${Common_1.Tables.JOINED_COMPANIES}\` as ${companyAlias} 
          ON CONCAT("bl-", ${alias}.clientCorporationID) = ${companyAlias}.bh_id
        LEFT JOIN \`${Common_1.DATASET_BULLHORN}.bh_jobs\` as bh_jobs 
          ON CONCAT("bl-", bh_jobs.id) = jobs.id
        `;
                return yield BigQueryService_1.BigQueryService.selectQuery(_dataset, _table, _fields, count, _condition, _join, alias);
            }
            throw "invalid filter options";
        });
    }
    apply(candidate, job) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, MainCrud_1.saveApplication)(job, candidate);
        });
    }
    getCandidates(job) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, MainCrud_1.getCandidatesOnJob)(job);
        });
    }
    save(candidate, job) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, MainCrud_1.saveJob)(job, candidate);
        });
    }
    update(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, Job_1.updateJob)(body);
        });
    }
    getAppliedJobs(authUser, candidate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, Job_1.getAppliedJobsByUser)(candidate || authUser.id);
        });
    }
    savedJobs(candidate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, MainCrud_1.getSavedJobs)(candidate);
        });
    }
    createJob(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, Job_1.createJob)(body);
        });
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/search"),
    __param(0, (0, routing_controllers_1.QueryParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "searchJobByID", null);
__decorate([
    (0, routing_controllers_1.Post)("/run-job"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "runJob", null);
__decorate([
    (0, routing_controllers_1.Post)("/search"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "searchByFilter", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getJobsByFilterFromMain", null);
__decorate([
    (0, routing_controllers_1.Get)("/apply"),
    __param(0, (0, routing_controllers_1.QueryParam)("candidate")),
    __param(1, (0, routing_controllers_1.QueryParam)("job")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "apply", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)("/candidates"),
    __param(0, (0, routing_controllers_1.QueryParam)("job")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getCandidates", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Put)("/save"),
    __param(0, (0, routing_controllers_1.QueryParam)("candidate")),
    __param(1, (0, routing_controllers_1.QueryParam)("job")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "save", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Patch)(),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "update", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)("/applied"),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __param(1, (0, routing_controllers_1.QueryParam)("candidate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getAppliedJobs", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)("/savedJobs"),
    __param(0, (0, routing_controllers_1.QueryParam)("candidate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "savedJobs", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Put)(),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createJob", null);
JobController = __decorate([
    (0, routing_controllers_1.JsonController)("/api/job")
], JobController);
exports.JobController = JobController;
const normalizeFilters = (filters) => {
    const filterObj = {};
    if (Array.isArray(filters)) {
        filters.forEach(({ key, value }) => {
            filterObj[key] = normalizeValue(value);
        });
    }
    else {
        Object.keys(filters).forEach((key) => {
            filterObj[key] = normalizeValue(filters[key]);
        });
    }
    return filterObj;
