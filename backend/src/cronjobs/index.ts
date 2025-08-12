import cron from "node-cron";
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
    }
    consoleLog('/// CRON_JOB_ENDED: BULLHORN_GET_COMPANIES');
  });

  cron.schedule("0 */2 * * *", async () => {
    try {
      consoleLog("/// CRON_JOB_STARTED: BULLHORN_GET_JOBS");
      await (await BullhornService.getClient()).getJobs(false, 50);
    } catch (error) {
      consoleLog(error);
    }
    consoleLog("/// CRON_JOB_ENDED: BULLHORN_GET_JOBS");
  });

  cron.schedule('0 */8 * * *', async () => {
    try {
      consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_CLIENTCONTACTS');
      await (await BullhornService.getClient()).getClientContacts(false, 50);
    } catch (error) {
      consoleLog(error);
    }
    consoleLog('/// CRON_JOB_ENDED: BULLHORN_GET_CLIENTCONTACTS');
  });

  cron.schedule('0 */12 * * *', async () => {
    try {
      consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_CANDIDATES');
      await (await BullhornService.getClient()).getCandidates(false, 50);
    } catch (error) {
      consoleLog(error);
    }
    consoleLog('/// CRON_JOB_ENDED: BULLHORN_GET_CANDIDATES');
  });

  cron.schedule('0 */12 * * *', async () => {
    try {
      consoleLog('/// CRON_JOB_STARTED: BULLHORN_GET_LEADS');
      await (await BullhornService.getClient()).getLeads(false, 50);
    } catch (error) {
      consoleLog(error);
    }
    consoleLog('/// CRON_JOB_ENDED: BULLHORN_GET_LEADS');
  });

  cron.schedule('0 */2 * * *', async () => {
    try {
      consoleLog('/// CRON_JOB_STARTED: GETRO_GET_COMPANIES');
      await (await GetroService.getClient()).getCompanies(false, 50);
    } catch (error) {
      consoleLog(error);
    }
    consoleLog('/// CRON_JOB_ENDED: GETRO_GET_COMPANIES');
