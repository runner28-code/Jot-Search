import { BullhornService } from "../services/BullhornService";

const testMode = process.argv[2] === "test";

(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_CLIENTCONTACTS');
        await (await BullhornService.getClient()).getClientContacts(testMode, 50);
    } catch (error) {
        consoleLog(error);
    }
    consoleLog('/// CRON_JOB_ENDED: BULLHORN_GET_CLIENTCONTACTS');
