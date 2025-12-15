"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BullhornService_1 = require("../services/BullhornService");
const utils_1 = require("../utils");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, utils_1.consoleLog)('/// CRON_JOB_STARTED: BULLHORN_GET_NEW_JOB_SUBSCRIPTION');
        yield (yield BullhornService_1.BullhornService.getClient()).getJobPostSubscription(10);
    }
    catch (error) {
        (0, utils_1.consoleLog)(error);
    }
    (0, utils_1.consoleLog)('/// CRON_JOB_ENDED: BULLHORN_GET_NEW_JOB_SUBSCRIPTION');
    process.exit();
}))();
