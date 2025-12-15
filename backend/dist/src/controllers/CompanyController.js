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
exports.CompanyController = void 0;
const routing_controllers_1 = require("routing-controllers");
const BigQueryService_1 = require("../services/BigQueryService");
const BullhornService_1 = require("../services/BullhornService");
const Company_1 = require("../services/Company");
const Common_1 = require("../types/Common");
const utils_1 = require("../utils");
const db_1 = __importDefault(require("../utils/db"));
const FieldMatch_1 = require("../utils/FieldMatch");
const constant_1 = require("../utils/constant");
const EmailService_1 = require("../services/EmailService");
const Candidate_1 = require("../services/Candidate");
const JobController_1 = require("./JobController");
let CompanyController = class CompanyController {
    constructor() {
        this.getConditionsFromFilters = (filters, filterableKey, operator = "OR") => {
            const _filters = filters === null || filters === void 0 ? void 0 : filters.filter((opt) => { var _a; return ((_a = FieldMatch_1.CompanyFilter[filterableKey]) === null || _a === void 0 ? void 0 : _a[opt.key]) != null; });
            if (_filters && (_filters === null || _filters === void 0 ? void 0 : _filters.length) > 0) {
                const _condition = _filters
                    .map((opt) => `LOWER(${opt.key}) LIKE '%${opt.value.toLowerCase()}%'`)
                    .join(` ${operator} `);
                return _condition;
            }
            return undefined;
        };
        this.getJoinedFields = (fields) => {
            return (fields === null || fields === void 0 ? void 0 : fields.length) ? fields.join(", ") : "*";
        };
    }
    searchJobByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const datasource = (0, utils_1.getDataSource)(id);
            if (datasource === Common_1.DataSource.BULLHORN) {
                const company = yield this.getCompanyByIdFromBullhorn(id);
                return {
                    company,
                    source: datasource,
                };
            }
            else if (datasource === Common_1.DataSource.GETRO) {
                const company = yield this.getCompanyByIdFromGetro(id);
                return {
                    company,
                    source: datasource,
                };
            }
            else {
                return {
                    source: Common_1.DataSource.UNKNOWN,
                    message: "unsupported id",
                };
            }
        });
    }
    save(authUser, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, Company_1.saveCompany)(body.company, body.candidate || authUser.id);
        });
    }
    send_candidates_to_employers(authUser, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authUser.role !== constant_1.COORDINATOR) {
                return {
                    result: false,
                    error: "You should be a coordinator for sending candidates to employers",
                };
            }
            try {
                const candidates_list = yield (0, Candidate_1.getCandidatesList)(body.candidates_ids);
                return {
                    result: yield (0, EmailService_1.sendCandidatesToEmployers)(candidates_list, body.employers_emails)
                };
            }
            catch (error) {
                return {
                    result: false,
                    error: "Please check email, email maybe invalid one",
                };
            }
        });
    }
    insert(body, authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authUser.role !== constant_1.COORDINATOR) {
                return {
                    result: false,
                    error: "You should be a coordinator for creating a company",
                };
            }
            const bullhornService = new BullhornService_1.BullhornService();
            yield bullhornService.init();
            return yield bullhornService.insertCompany(body);
        });
    }
    savedCompanies(authUser, candidate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, Company_1.getSavedCompanies)(candidate || authUser.id);
        });
    }
    getCompanyByIdFromBullhorn(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = "*";
            const dataset = Common_1.DATASET_BULLHORN;
            const table = Common_1.Tables.COMPANIES;
            const condition = `id = '${id}'`;
            const result = (yield BigQueryService_1.BigQueryService.selectQuery(dataset, table, fields, undefined, condition));
            return result ? result[0] : undefined;
        });
    }
    getCompanyByIdFromGetro(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = "*";
            const dataset = Common_1.DATASET_GETRO;
            const table = Common_1.Tables.COMPANIES;
            const condition = `id = '${id}'`;
            const result = (yield BigQueryService_1.BigQueryService.selectQuery(dataset, table, fields, undefined, condition));
            return result ? result[0] : undefined;
        });
    }
    sendCandidates(authUser, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authUser.role !== constant_1.COORDINATOR) {
                return {
                    result: false,
                    error: "You should be a coordinator for sending candidates to employers",
                };
            }
            // TODO: Add email service
            const companyCandidateInvites = [];
            for (const companyId of body.companyIds) {
                for (const candidateId of body.candidateIds) {
                    companyCandidateInvites.push({
                        companyId,
                        candidateId,
                    });
                }
            }
            try {
                const res = yield db_1.default.companyCandidateInvites.createMany({
                    data: companyCandidateInvites,
                });
                return {
                    res,
                    result: true
                };
            }
            catch (error) {
                return {
                    result: false,
                    error,
                };
            }
        });
    }
    searchByFilter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, count, filters } = body;
                const wheres = (0, JobController_1.normalizeFilters)(filters);
                const skip = (count || 0) * ((page - 1) || 0);
                const companiesPromise = db_1.default.company.findMany({
                    where: wheres,
                    take: count,
                    skip: skip < 0 ? 0 : skip,
                    orderBy: {
                        name: "asc",
                    }
                });
                const totalPromise = db_1.default.company.count({
                    where: wheres
                });
                const [companies, total] = yield Promise.all([companiesPromise, totalPromise]);
                const companyURLs = companies.filter(company => company.companyURL)
                    .map(company => company.companyURL);
                const getroCompanies = yield db_1.default.getroCompany.findMany({
                    select: {
                        domain: true,
                        logo_url: true,
                        linkedin_url: true,
                    },
                    where: {
                        domain: {
                            in: companyURLs
                        }
                    }
                });
                const extendedCompanies = companies.map((company) => {
                    const getroCompany = getroCompanies.find(gc => gc.domain === company.companyURL);
                    if (getroCompany) {
                        company.logo = getroCompany.logo_url;
                        company.linkedin_url = getroCompany.linkedin_url;
                    }
                    return company;
                });
                const response = {
                    companies: extendedCompanies || [],
                    total,
                    message: null,
                };
                return response;
            }
            catch (error) {
                console.log(error);
                return {
                    message: error,
                };
            }
        });
    }
    getCompaniesFromJoinTable(filters, fields, count, operator = "OR") {
        return __awaiter(this, void 0, void 0, function* () {
            const _fields = this.getJoinedFields(fields);
            const _conditions = this.getConditionsFromFilters(filters, "joined", operator);
            const result = (yield BigQueryService_1.BigQueryService.selectQuery(Common_1.DATASET_MAIN, Common_1.Tables.JOINED_COMPANIES, _fields, count, _conditions));
            return result;
        });
    }
    getCompaniesByFilterFromBullhorn(filters, fields, page, count, operator = "OR") {
        return __awaiter(this, void 0, void 0, function* () {
            const _filters = (filters === null || filters === void 0 ? void 0 : filters.filter((opt) => Object.keys(FieldMatch_1.CompanyFilter.bullhorn).indexOf(opt.key) > -1)) || [];
            const _fields = fields ? fields.join(", ") : "*";
            const _dataset = Common_1.DATASET_BULLHORN;
            const _table = Common_1.Tables.COMPANIES;
            const _condition = _filters
                .map((opt) => `LOWER(${FieldMatch_1.CompanyFilter.bullhorn[opt.key]}) LIKE '%${opt.value.toLowerCase()}%'`)
                .join(` ${operator} `);
            const result = yield BigQueryService_1.BigQueryService.selectQuery(_dataset, _table, _fields, count, _condition);
            return result;
        });
    }
    getCompaniesByFilterFromGetro(filters, fields, page, count, operator = "OR") {
        return __awaiter(this, void 0, void 0, function* () {
            const _filters = (filters === null || filters === void 0 ? void 0 : filters.filter((opt) => Object.keys(FieldMatch_1.CompanyFilter.getro).indexOf(opt.key) > -1)) || [];
            const _fields = fields ? fields.join(", ") : "*";
            const _dataset = Common_1.DATASET_GETRO;
            const _table = Common_1.Tables.COMPANIES;
            const _condition = _filters
                .map((opt) => `LOWER(${FieldMatch_1.CompanyFilter.getro[opt.key]}) LIKE '%${opt.value.toLowerCase()}%'`)
                .join(` ${operator} `);
            const result = yield BigQueryService_1.BigQueryService.selectQuery(_dataset, _table, _fields, count, _condition);
            return result;
        });
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/search"),
    __param(0, (0, routing_controllers_1.QueryParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "searchJobByID", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Put)("/save"),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "save", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Put)("/send_candidates_to_employers"),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "send_candidates_to_employers", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Put)(),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "insert", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)("/saved"),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __param(1, (0, routing_controllers_1.QueryParam)("candidate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "savedCompanies", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)("/sendCandidates"),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "sendCandidates", null);
__decorate([
    (0, routing_controllers_1.Post)("/search"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "searchByFilter", null);
CompanyController = __decorate([
    (0, routing_controllers_1.JsonController)("/api/company")
], CompanyController);
exports.CompanyController = CompanyController;
