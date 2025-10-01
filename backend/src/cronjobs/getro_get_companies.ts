import { GetroService } from "../services/GetroService";
import { consoleLog } from "../utils";

(async () => {
    try {
        consoleLog('/// CRON_JOB_STARTED: GETRO_GET_COMPANIES');
        await (await GetroService.getClient()).getCompanies(testMode, 50);
    } catch (error) {
        consoleLog(error);
