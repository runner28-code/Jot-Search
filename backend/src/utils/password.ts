const crypto = require('crypto');

export const clearPassword = (object: any) => {
    delete object?.password;
}

export const encryptPassword = (password: string) => {
    const sr = crypto.randomBytes(12).toString('hex');
    const encrypted_password_hash = crypto.createHash('sha512');

    encrypted_password_hash.update(sr + password);
