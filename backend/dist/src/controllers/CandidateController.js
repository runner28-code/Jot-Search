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
var __rest = (this && this.__rest) || function (s, e) {
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
exports.CandidateController = void 0;
const routing_controllers_1 = require("routing-controllers");
const Candidate_1 = require("../services/Candidate");
const constant_1 = require("../utils/constant");
const db_1 = __importDefault(require("../utils/db"));
const MainCrud_1 = require("../utils/MainCrud");
const password_1 = require("../utils/password");
const constant_2 = require("../utils/constant");
const EmailService_1 = require("../services/EmailService");
const Job_1 = require("../services/Job");
const JobController_1 = require("./JobController");
let CandidateController = class CandidateController {
    savedJobs(candidate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, MainCrud_1.getSavedJobs)(candidate);
        });
    }
    searchById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db_1.default.user.findFirst({
                    where: {
                        id,
                    },
                    include: {
                        candidate: true,
                    },
                });
                let candidate;
                if (user) {
                    const { password, candidate: userCandidate } = user, returnableUserData = __rest(user, ["password", "candidate"]);
                    candidate = Object.assign(Object.assign({}, (userCandidate || {})), returnableUserData);
                }
                else {
                    candidate = yield db_1.default.candidate.findFirst({
                        where: {
                            id,
                        },
                    });
                }
                return {
                    candidate: (0, password_1.clearPassword)(candidate),
                    message: !candidate ? "No user with given ID" : undefined,
                };
            }
            catch (error) {
                return { message: error };
            }
        });
    }
    searchByFilters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, count, filters, fields } = body;
                const skip = (count || 0) * ((page - 1) || 0);
                const where = (0, JobController_1.normalizeFilters)(filters);
                let candidatesPromise;
                if (fields) {
                    const _fields = {};
                    _fields['email'] = true;
                    fields.forEach((field) => {
                        _fields[field] = true;
                    });
                    candidatesPromise = db_1.default.candidate.findMany({
                        where,
                        skip: skip < 0 ? 0 : skip,
                        take: count,
                        select: Object.assign({ id: true }, _fields),
                        orderBy: {
                            firstName: "asc",
                        }
                    });
                }
                else {
                    candidatesPromise = db_1.default.candidate.findMany({
                        take: count || 100,
                        skip: skip < 0 ? 0 : skip,
                        include: {
                            category: true,
                        },
                        where,
                        orderBy: {
                            firstName: "asc",
                        }
                    });
                }
                const totalPromise = db_1.default.candidate.count({ where });
                const [candidates, total] = yield Promise.all([candidatesPromise, totalPromise]);
                candidates.forEach((candidate) => (0, password_1.clearPassword)(candidate));
                const emails = candidates.map((candidate) => candidate.email);
                const users = yield db_1.default.user.findMany({
                    where: {
                        email: {
                            in: emails
                        }
                    }
                });
                const extendedCandidates = candidates.map((candidate) => {
                    const user = users.find(user => user.email === candidate.email);
                    if (user) {
                        candidate.user = user;
                        delete candidate.user.password;
                    }
                    return candidate;
                });
                return {
                    candidates: extendedCandidates,
                    total,
                };
            }
            catch (error) {
                console.log(error);
                return { message: error };
            }
        });
    }
    save(body, authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authUser.role === constant_1.COMPANY) {
                return yield (0, Candidate_1.saveCandidate)(body.candidate, body.company || authUser.id);
            }
            else {
                return {
                    result: false,
                    message: "You are not a company",
                };
            }
        });
    }
    savedCandidates(authUser, candidate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, Candidate_1.getSavedCandidates)(candidate || authUser.id);
        });
    }
    sendJobs(authUser, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authUser.role !== constant_2.COORDINATOR) {
                return {
                    result: false,
                    error: "You should be a coordinator for sending jobs to candidates",
                };
            }
            try {
                const jobsPromise = (0, Job_1.getJobsList)(body.jobIds);
                const candidatesPromise = db_1.default.candidate.findMany({
                    where: {
                        id: {
                            in: body.candidateIds,
                        },
                    },
                });
                const [jobs, candidates] = yield Promise.all([
                    jobsPromise,
                    candidatesPromise,
                ]);
                const candidatesWithEmail = candidates.filter((candidate) => candidate.email);
                let result;
                let sentTo;
                if (process.env.SEND_EMAILS_TO_CANDIDATES === "true") {
                    const candidateEmails = candidatesWithEmail.map((candidate) => candidate.email);
                    sentTo = candidateEmails;
                    result = yield (0, EmailService_1.sendJobsToCandidates)(jobs, candidateEmails);
                }
                else {
                    console.log("Sending emails to candidates is disabled");
                    console.log({ candidatesWithEmail });
                    if (!process.env.TEST_SEND_EMAILS_TO) {
                        result = true;
                    }
                    else {
                        const testSendTo = process.env.TEST_SEND_EMAILS_TO.split(",");
                        sentTo = testSendTo;
                        result = yield (0, EmailService_1.sendJobsToCandidates)(jobs, testSendTo);
                    }
                }
                const candidateJobInvites = [];
                for (const candidate of candidatesWithEmail) {
                    for (const jobId of body.jobIds) {
                        candidateJobInvites.push({
                            candidateId: candidate.id,
                            jobId: jobId,
                        });
                    }
                }
                if (result && (candidateJobInvites === null || candidateJobInvites === void 0 ? void 0 : candidateJobInvites.length)) {
                    yield db_1.default.candidateJobInvites.createMany({
                        data: candidateJobInvites
                    });
                }
                return {
                    result
                };
            }
            catch (error) {
                return {
                    result: false,
                    error: "Please check email, jobIds and candidateIds",
                };
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)("/savedJobs"),
    __param(0, (0, routing_controllers_1.QueryParam)("candidate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "savedJobs", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)("/search"),
    __param(0, (0, routing_controllers_1.QueryParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "searchById", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)("/search"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "searchByFilters", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Put)("/save"),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "save", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)("/saved"),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __param(1, (0, routing_controllers_1.QueryParam)("candidate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "savedCandidates", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)("/sendJobs"),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "sendJobs", null);
CandidateController = __decorate([
    (0, routing_controllers_1.JsonController)("/api/candidate")
], CandidateController);
exports.CandidateController = CandidateController;
