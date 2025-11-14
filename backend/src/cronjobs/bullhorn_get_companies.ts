import { BullhornService } from "../services/BullhornService";
import { consoleLog } from "../utils";
const testMode = process.argv[2] === "test";

(async () => {
    try {
        await (await BullhornService.getClient()).getCompanies(testMode, 50);
    } catch (error) {
        consoleLog(error);
    }
    consoleLog('/// CRON_JOB_ENDED: BULLHORN_GET_COMPANIES');
