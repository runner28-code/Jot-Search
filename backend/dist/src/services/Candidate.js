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
exports.getCandidatesList = exports.getSavedCandidates = exports.saveCandidate = void 0;
const db_1 = __importDefault(require("../utils/db"));
const saveCandidate = (candidateId, companyUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existing = yield db_1.default.user.findFirst({
            where: {
                AND: {
                    id: companyUserId,
                    savedCandidates: {
                        some: {
                            id: candidateId,
                        },
                    },
                },
            },
        });
        if (!existing) {
            yield db_1.default.user.update({
                where: {
                    id: companyUserId,
                },
                data: {
                    savedCandidates: {
                        connect: {
                            id: candidateId,
                        },
                    },
                },
            });
        }
        else {
            yield db_1.default.user.update({
                where: {
                    id: companyUserId,
                },
                data: {
                    savedCandidates: {
                        disconnect: {
                            id: candidateId,
                        },
                    },
                },
            });
        }
        return {
            result: true,
            message: existing ? "unsaved candidate" : "saved candidate",
        };
    }
    catch (error) {
        console.log(error);
        return { result: false, message: error };
    }
});
exports.saveCandidate = saveCandidate;
const getSavedCandidates = (companyUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.default.user.findFirst({
            where: {
                id: companyUserId,
            },
            include: {
                savedCandidates: {
                    include: {
                        users: true,
                    }
                },
            },
        });
        if (user && user.savedCandidates && user.savedCandidates.length > 0) {
            user.savedCandidates = user.savedCandidates.map(candidate => {
                var _a;
                return (Object.assign(Object.assign({}, candidate), { user: (_a = candidate.users) === null || _a === void 0 ? void 0 : _a[0] }));
            });
        }
        return {
            result: true,
            candidates: user === null || user === void 0 ? void 0 : user.savedCandidates,
        };
    }
    catch (error) {
        console.log(error);
        return { result: false, message: error };
    }
});
exports.getSavedCandidates = getSavedCandidates;
const getCandidatesList = (candidates_ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidates = yield db_1.default.user.findMany({
            where: {
                id: {
                    in: candidates_ids,
                },
            },
        });
        return candidates.map((user) => user.email);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getCandidatesList = getCandidatesList;
