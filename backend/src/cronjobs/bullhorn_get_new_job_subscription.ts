import { BullhornService } from "../services/BullhornService";
import { consoleLog } from "../utils";

(async () => {
    try {
        await (await BullhornService.getClient()).getJobPostSubscription(10);
    } catch (error) {
        consoleLog(error);
    }
    consoleLog('/// CRON_JOB_ENDED: BULLHORN_GET_NEW_JOB_SUBSCRIPTION');
    process.exit();
