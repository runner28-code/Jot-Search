"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
const clearPassword = (object) => {
    object === null || object === void 0 ? true : delete object.password;
    return object;
};
exports.clearPassword = clearPassword;
const encryptPassword = (password) => {
    const sr = crypto.randomBytes(12).toString('hex');
    const encrypted_password_hash = crypto.createHash('sha512');
    encrypted_password_hash.update(sr + password);
    return `${sr}${encrypted_password_hash.digest('hex')}`;
