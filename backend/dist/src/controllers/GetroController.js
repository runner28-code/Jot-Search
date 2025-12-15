"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.GetroController = void 0;
const routing_controllers_1 = require("routing-controllers");
const GetroService_1 = require("../services/GetroService");
let GetroController = class GetroController {
    getCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield GetroService_1.GetroService.getClient()).getCompanies();
        });
    }
    getMembers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield GetroService_1.GetroService.getClient()).getMembers();
        });
    }
    getJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield GetroService_1.GetroService.getClient()).getJobs();
        });
    }
};
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)('/getro/companies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetroController.prototype, "getCompanies", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)('/getro/members'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetroController.prototype, "getMembers", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)('/getro/jobs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetroController.prototype, "getJobs", null);
GetroController = __decorate([
    (0, routing_controllers_1.Controller)()
], GetroController);
exports.GetroController = GetroController;
