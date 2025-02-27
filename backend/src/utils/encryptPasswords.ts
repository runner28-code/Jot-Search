// for start script use
// npm run build && GOOGLE_APPLICATION_CREDENTIALS='./src/config/service-account-file.json' node ./dist/utils/encryptPasswords.js
// change where condition in select for alter script scope

import { User, USERKEYS } from "../types/User";
import { BigQueryService } from "../services/BigQueryService";
import { DATASET_MAIN, Tables } from "../types/Common";

