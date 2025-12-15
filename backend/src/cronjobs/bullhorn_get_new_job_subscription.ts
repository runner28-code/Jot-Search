import { BullhornService } from "../services/BullhornService";
import { consoleLog } from "../utils";

(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_NEW_JOB_SUBSCRIPTION');
        await (await BullhornService.getClient()).getJobPostSubscription(10);
    } catch (error) {
        consoleLog(error);
    }
    consoleLog('/// CRON_JOB_ENDED: BULLHORN_GET_NEW_JOB_SUBSCRIPTION');
    process.exit();
})();