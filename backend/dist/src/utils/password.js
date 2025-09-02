"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.encryptPassword = exports.clearPassword = void 0;
const crypto = require('crypto');
// Temp comment
const clearPassword = (object) => {
    object === null || object === void 0 ? true : delete object.password;
    return object;
