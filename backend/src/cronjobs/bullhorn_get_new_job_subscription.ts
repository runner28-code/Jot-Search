import { BullhornService } from "../services/BullhornService";
import { consoleLog } from "../utils";

(async () => {
    try {
        await (await BullhornService.getClient()).getJobPostSubscription(10);
    } catch (error) {
