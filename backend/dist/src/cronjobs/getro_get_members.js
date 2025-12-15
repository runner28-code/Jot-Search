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
const GetroService_1 = require("../services/GetroService");
const utils_1 = require("../utils");
const testMode = process.argv[2] === "test";
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, utils_1.consoleLog)('/// CRON_JOB_STARTED: GETRO_GET_MEMBERS');
        yield (yield GetroService_1.GetroService.getClient()).getMembers(testMode, 50);
    }
    catch (error) {
        (0, utils_1.consoleLog)(error);
    }
    (0, utils_1.consoleLog)('/// CRON_JOB_ENDED: GETRO_GET_MEMBERS');
    process.exit();
}))();
