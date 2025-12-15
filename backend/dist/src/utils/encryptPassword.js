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
// Replace password string on line 6
// Run script
const password_1 = require("./password");
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('/// START ENCRYPT PASSWORD');
    try {
        console.log((0, password_1.encryptPassword)('123456'));
    }
    catch (error) {
        console.log(error);
    }
    console.log('/// STOP ENCRYPT PASSWORD');
    process.exit();
}))();
