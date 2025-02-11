"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
const clearPassword = (object) => {
    object === null || object === void 0 ? true : delete object.password;
    return object;
