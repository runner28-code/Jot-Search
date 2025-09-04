import { consoleLog } from "../utils";

const testMode = process.argv[2] === "test";

(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_CLIENTCONTACTS');
        await (await BullhornService.getClient()).getClientContacts(testMode, 50);
    } catch (error) {
