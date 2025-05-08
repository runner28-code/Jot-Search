const crypto = require('crypto');

    delete object?.password;
    return object;
}

export const encryptPassword = (password: string) => {
    const sr = crypto.randomBytes(12).toString('hex');
    const encrypted_password_hash = crypto.createHash('sha512');
