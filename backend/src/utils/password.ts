const crypto = require('crypto');

export const clearPassword = (object: any) => {
    delete object?.password;
    return object;
