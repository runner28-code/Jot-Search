import { BullhornService } from "../services/BullhornService";
import { consoleLog } from "../utils";

(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_COMPANIES');
        await (await BullhornService.getClient()).getCompanies(testMode, 50);
    } catch (error) {
