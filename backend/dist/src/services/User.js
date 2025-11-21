"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recovery = exports.getLandingPageStats = exports.getStats = exports.findUserByEmail = exports.login = exports.isExistUserFull = exports.isExistUser = exports.getUserById = exports.addUserHistoryEntries = exports.update = exports.register = void 0;
const User_1 = require("../types/User");
const BigQueryService_1 = require("./BigQueryService");
const Common_1 = require("../types/Common");
const constant_1 = require("../utils/constant");
const utils_1 = require("../utils");
const config_1 = __importDefault(require("../config"));
const db_1 = __importDefault(require("../utils/db"));
const password_1 = require("../utils/password");
const EmailService_1 = require("./EmailService");
const jwtUtils_1 = require("../utils/jwtUtils");
const isNullOrEmpty = (value) => {
    return !value || (value && !`${value}`.trim());
