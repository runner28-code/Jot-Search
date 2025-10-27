// Replace password string on line 6
// Run script
import { encryptPassword } from "./password";

(async () => {
  try {
        console.log(encryptPassword('123456'));
    } catch (error) {
        console.log(error);
    }

