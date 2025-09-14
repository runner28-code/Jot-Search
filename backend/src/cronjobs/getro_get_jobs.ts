import { GetroService } from "../services/GetroService";
import { consoleLog } from "../utils";

(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: GETRO_GET_JOBS');
        await (await GetroService.getClient()).getJobs(testMode, 50);
    } catch (error) {
        consoleLog(error);
