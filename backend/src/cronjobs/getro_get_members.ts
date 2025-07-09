import { consoleLog } from "../utils";
const testMode = process.argv[2] === "test";

(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: GETRO_GET_MEMBERS');
