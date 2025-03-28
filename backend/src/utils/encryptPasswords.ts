// for start script use
// npm run build && GOOGLE_APPLICATION_CREDENTIALS='./src/config/service-account-file.json' node ./dist/utils/encryptPasswords.js
// change where condition in select for alter script scope

import { encryptPassword } from "./password";
import { User, USERKEYS } from "../types/User";
import { BigQueryService } from "../services/BigQueryService";

(async () => {
    try {
        console.log('/// START ENCRYPT ALL PASSWORDS');

        const query = `
            SELECT id,email,password FROM \`${DATASET_MAIN}.${Tables.USER}\`
