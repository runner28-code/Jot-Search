import cron from "node-cron";
import { BullhornService } from "../services/BullhornService";
import { GetroService } from "../services/GetroService";
import { consoleLog } from "../utils";

const setupCronJobs = async () => {
  console.log('*** Running all crons ***');

    try {
