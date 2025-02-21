import cron from "node-cron";
import { BullhornService } from "../services/BullhornService";
import { GetroService } from "../services/GetroService";
import { consoleLog } from "../utils";

const setupCronJobs = async () => {
  console.log('*** Running all crons ***');

  cron.schedule('0 */2 * * *', async () => {
    try {
      consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_COMPANIES');
      await (await BullhornService.getClient()).getCompanies(false, 50);
    } catch (error) {
      consoleLog(error);
