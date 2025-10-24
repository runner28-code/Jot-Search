import { BullhornService } from "../services/BullhornService";
import { consoleLog } from "../utils";


(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_CLIENTCONTACTS');
        await (await BullhornService.getClient()).getClientContacts(testMode, 50);
    } catch (error) {
        consoleLog(error);
    }
