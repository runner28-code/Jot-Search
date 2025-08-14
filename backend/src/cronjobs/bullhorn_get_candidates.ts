import { BullhornService } from "../services/BullhornService";
import { consoleLog } from "../utils";

const testMode = process.argv[2] === "test";

(async () => {
    try {
        await (await BullhornService.getClient()).getCandidates(testMode, 50);
