import { BullhornService } from "../services/BullhornService";
import { consoleLog } from "../utils";

(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_JOBS');
        await (await BullhornService.getClient()).getJobs(testMode, 50);
    } catch (error) {
        consoleLog(error);
    }
