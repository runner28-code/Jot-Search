"use strict";
exports.checkPassword = exports.encryptPassword = exports.clearPassword = void 0;
const crypto = require('crypto');
const clearPassword = (object) => {
    object === null || object === void 0 ? true : delete object.password;
    return object;
