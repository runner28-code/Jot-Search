import { BullhornService } from "../services/BullhornService";
import { consoleLog } from "../utils";

    try {
        consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_NEW_JOB_SUBSCRIPTION');
        await (await BullhornService.getClient()).getJobPostSubscription(10);
    } catch (error) {
        consoleLog(error);
    }
