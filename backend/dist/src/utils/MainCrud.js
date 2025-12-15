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
exports.getCandidatesOnJob = exports.getSavedJobs = exports.saveJob = exports.saveApplication = void 0;
const db_1 = __importDefault(require("./db"));
const saveApplication = (job, candidate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("applying");
        console.log({ job, candidate });
        const existing = yield db_1.default.application.findFirst({
            where: {
                jobId: job,
                userId: candidate,
            },
        });
        if (!existing) {
            const app = yield db_1.default.application.create({
                data: {
                    user: {
                        connect: {
                            id: candidate,
                        },
                    },
                    job: {
                        connect: {
                            id: job,
                        },
                    }
                },
            });
            console.log({ app });
            return {
                result: true,
            };
        }
        else {
            console.log("already applied");
            return {
                result: false,
                message: "already applied",
            };
        }
    }
    catch (error) {
        console.log(error);
        return { result: false, message: error };
    }
});
exports.saveApplication = saveApplication;
const saveJob = (job, candidate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("saving job");
        const existing = yield db_1.default.user.findFirst({
            include: {
                savedJobs: true,
            },
            where: {
                AND: {
                    id: candidate,
                    savedJobs: {
                        some: {
                            id: job,
                        },
                    },
                },
            },
        });
        if (!existing) {
            yield db_1.default.user.update({
                where: {
                    id: candidate,
                },
                data: {
                    savedJobs: {
                        connect: {
                            id: job,
                        },
                    },
                },
            });
        }
        else {
            yield db_1.default.user.update({
                where: {
                    id: candidate,
                },
                data: {
                    savedJobs: {
                        disconnect: {
                            id: job,
                        },
                    },
                },
            });
        }
        console.log("success");
        return {
            result: true,
            messsage: existing ? "unsaved job" : "saved job",
        };
    }
    catch (error) {
        console.log(error);
        return { result: false, message: error };
    }
});
exports.saveJob = saveJob;
const getSavedJobs = (candidateId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidate = yield db_1.default.user.findFirst({
            where: {
                id: candidateId,
            },
            include: {
                savedJobs: true,
            },
        });
        console.log({ candidate });
        return {
            jobs: candidate === null || candidate === void 0 ? void 0 : candidate.savedJobs,
            result: true,
        };
    }
    catch (error) {
        console.log(error);
        return { message: error, result: false };
    }
});
exports.getSavedJobs = getSavedJobs;
const getCandidatesOnJob = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const job = yield db_1.default.job.findFirst({
            where: {
                id: jobId,
            },
            include: {
                applications: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        const candidates = (_a = job === null || job === void 0 ? void 0 : job.applications) === null || _a === void 0 ? void 0 : _a.map((app) => app.user);
        return {
            candidates,
            result: true,
        };
    }
    catch (error) {
        console.log(error);
        return { message: error, result: false };
    }
});
exports.getCandidatesOnJob = getCandidatesOnJob;
