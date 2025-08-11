import { GetroService } from "../services/GetroService";
import { consoleLog } from "../utils";

(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: GETRO_GET_MEMBERS');
        await (await GetroService.getClient()).getMembers(testMode, 50);
    } catch (error) {
