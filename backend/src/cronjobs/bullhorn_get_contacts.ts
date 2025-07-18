import { BullhornService } from "../services/BullhornService";

const testMode = process.argv[2] === "test";

(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_CLIENTCONTACTS');
