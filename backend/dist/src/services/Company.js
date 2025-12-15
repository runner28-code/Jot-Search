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
exports.getSavedCompanies = exports.saveCompany = void 0;
const db_1 = __importDefault(require("../utils/db"));
const saveCompany = (company, candidate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log({ company, candidate });
        const existing = yield db_1.default.user.findFirst({
            where: {
                id: candidate,
                savedCompanies: {
                    some: {
                        id: company,
                    },
                },
            },
        });
        console.log({ existing });
        if (existing) {
            yield db_1.default.user.update({
                where: {
                    id: candidate,
                },
                data: {
                    savedCompanies: {
                        disconnect: {
                            id: company,
                        },
                    },
                },
            });
        }
        else {
            console.log("update");
            yield db_1.default.user.update({
                where: {
                    id: candidate,
                },
                data: {
                    savedCompanies: {
                        connect: {
                            id: company,
                        },
                    },
                },
            });
        }
        return {
            result: true,
            message: existing ? "unsaved company" : "saved company",
        };
    }
    catch (e) {
        console.log(e);
        return { result: false, message: e };
    }
});
exports.saveCompany = saveCompany;
const getSavedCompanies = (candidateId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidate = yield db_1.default.user.findFirst({
            where: {
                id: candidateId,
            },
            include: {
                savedCompanies: true,
            },
        });
        console.log({ savedCompanies: candidate === null || candidate === void 0 ? void 0 : candidate.savedCompanies });
        return {
            companies: candidate === null || candidate === void 0 ? void 0 : candidate.savedCompanies,
            result: true,
        };
    }
    catch (e) {
        console.log(e);
        return { result: false, message: e };
    }
});
exports.getSavedCompanies = getSavedCompanies;
