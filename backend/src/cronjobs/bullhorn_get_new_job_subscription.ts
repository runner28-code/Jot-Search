import { BullhornService } from "../services/BullhornService";

(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_NEW_JOB_SUBSCRIPTION');
        await (await BullhornService.getClient()).getJobPostSubscription(10);
