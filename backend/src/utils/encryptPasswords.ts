// for start script use
// npm run build && GOOGLE_APPLICATION_CREDENTIALS='./src/config/service-account-file.json' node ./dist/utils/encryptPasswords.js

import { encryptPassword } from "./password";
import { User, USERKEYS } from "../types/User";
