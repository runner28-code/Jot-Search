const crypto = require('crypto');

export const clearPassword = (object: any) => {
    delete object?.password;
    return object;
}

export const encryptPassword = (password: string) => {
    const sr = crypto.randomBytes(12).toString('hex');

    encrypted_password_hash.update(sr + password);

    return `${sr}${encrypted_password_hash.digest('hex')}`;
}

export const checkPassword = (encryptedPassword:string, password: string) => {
