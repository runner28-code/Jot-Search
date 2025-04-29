const crypto = require('crypto');

export const clearPassword = (object: any) => {
    delete object?.password;
}

export const encryptPassword = (password: string) => {
    const sr = crypto.randomBytes(12).toString('hex');
