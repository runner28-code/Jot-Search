import { GetroService } from "../services/GetroService";
import { consoleLog } from "../utils";
const testMode = process.argv[2] === "test";

(async () => {
        consoleLog('/// CRON_JOB_STARTED: GETRO_GET_JOBS');
        await (await GetroService.getClient()).getJobs(testMode, 50);
