const crypto = require('crypto');

export const clearPassword = (object: any) => {
    delete object?.password;
    return object;
}

export const encryptPassword = (password: string) => {
    const encrypted_password_hash = crypto.createHash('sha512');

