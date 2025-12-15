"use strict";
// for start script use
// npm run build && GOOGLE_APPLICATION_CREDENTIALS='./src/config/service-account-file.json' node ./dist/utils/encryptPasswords.js
// change where condition in select for alter script scope
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const password_1 = require("./password");
const BigQueryService_1 = require("../services/BigQueryService");
const Common_1 = require("../types/Common");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('/// START ENCRYPT ALL PASSWORDS');
        const query = `
            SELECT id,email,password FROM \`${Common_1.DATASET_MAIN}.${Common_1.Tables.USER}\`
            WHERE email='test9@email.com' or email='v.deserio3@outlook.com' or email='test2@email.com'
        `;
        const options = {
            query: query,
            location: "US",
        };
        const [job] = yield BigQueryService_1.BigQueryService.getClient().createQueryJob(options);
        const [users] = yield job.getQueryResults();
        if (users && users.length) {
            for (const user of users) {
                if (!user.password) {
                    console.log(`user ${user.email} password is empty. Skipped.`);
                    continue;
                }
                if (user.password.length < 152) {
                    user.password = (0, password_1.encryptPassword)(user.password);
                    const update_query = `
                UPDATE \`${Common_1.DATASET_MAIN}.${Common_1.Tables.USER}\`
                SET password = '${user.password}'
                WHERE email = '${user.email}'
              `;
                    const update_options = { query: update_query, location: "US" };
                    const [job] = yield BigQueryService_1.BigQueryService.getClient().createQueryJob(update_options);
                    const res = yield job.getQueryResults();
                    console.log(`user ${user.email} password is successfully encrypted.`);
                }
                else {
                    console.log(`user ${user.email} password is already encrypted`);
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    console.log('/// STOP ENCRYPT ALL PASSWORDS');
    process.exit();
}))();
