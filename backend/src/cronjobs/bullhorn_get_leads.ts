import { consoleLog } from "../utils";

const testMode = process.argv[2] === "test";

(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_LEADS');
        await (await BullhornService.getClient()).getLeads(testMode, 50);
