import { GetroService } from "../services/GetroService";
import { consoleLog } from "../utils";
const testMode = process.argv[2] === "test";

(async () => {
    try {
        await (await GetroService.getClient()).getJobs(testMode, 50);
