"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyJwtToken = exports.CreateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
    const token = jsonwebtoken_1.default.sign(data, config_1.default.authSecret || 'inTulsa', { expiresIn: 2 * 3600 });
    return token;
