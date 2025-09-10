import { GetroService } from "../services/GetroService";
import { consoleLog } from "../utils";
const testMode = process.argv[2] === "test";

(async () => {
    try {
        await (await GetroService.getClient()).getMembers(testMode, 50);
    } catch (error) {
        consoleLog(error);
