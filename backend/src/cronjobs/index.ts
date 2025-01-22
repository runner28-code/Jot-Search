import cron from "node-cron";
import { GetroService } from "../services/GetroService";
import { consoleLog } from "../utils";

const setupCronJobs = async () => {
