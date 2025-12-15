"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.encryptPassword = exports.clearPassword = void 0;
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
};
exports.encryptPassword = encryptPassword;
const checkPassword = (encryptedPassword, password) => {
    const sr = encryptedPassword.substring(0, 24);
    const hash_in_db = encryptedPassword.substring(24);
    const hash = crypto.createHash('sha512');
    hash.update(sr + password);
    const calculated_hash = hash.digest('hex');
    return hash_in_db == calculated_hash;
};
exports.checkPassword = checkPassword;
