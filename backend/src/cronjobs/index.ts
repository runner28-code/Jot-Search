import cron from "node-cron";
import { BullhornService } from "../services/BullhornService";
import { GetroService } from "../services/GetroService";
import { consoleLog } from "../utils";

const setupCronJobs = async () => {

  cron.schedule('0 */2 * * *', async () => {
