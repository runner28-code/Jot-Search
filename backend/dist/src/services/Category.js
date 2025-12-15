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
exports.getCategoriesByFilter = void 0;
const db_1 = __importDefault(require("../utils/db"));
const getCategoriesByFilter = (filters, fields, count, operator = "OR") => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: assumes format for fields and filters
    const categories = yield db_1.default.category.findMany({
        where: (filters === null || filters === void 0 ? void 0 : filters.length) ? filters : undefined,
        take: count,
    });
    return categories;
});
exports.getCategoriesByFilter = getCategoriesByFilter;
