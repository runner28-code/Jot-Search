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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientContactController = void 0;
const routing_controllers_1 = require("routing-controllers");
const db_1 = __importDefault(require("../utils/db"));
const password_1 = require("../utils/password");
let ClientContactController = class ClientContactController {
    searchById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield db_1.default.clientContact.findFirst({
                    where: {
                        id,
                    },
                });
                return {
                    contact: (0, password_1.clearPassword)(contact),
                    message: !contact ? "No client contact with given ID" : undefined,
                };
            }
            catch (error) {
                return { message: error };
            }
        });
    }
    // @Authorized()
    searchByFilters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, count } = body;
                // TODO: assuming filters and fields format
                const clientContacts = yield db_1.default.candidate.findMany({
                    // where: whereFilters,
                    take: count || 100,
                    skip: (count || 0) * (page || 0),
                });
                clientContacts === null || clientContacts === void 0 ? void 0 : clientContacts.forEach((clientContact) => (0, password_1.clearPassword)(clientContact));
                return {
                    clientContacts: clientContacts || [],
                };
            }
            catch (error) {
                console.log(error);
                return { message: error };
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)("/search"),
    __param(0, (0, routing_controllers_1.QueryParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientContactController.prototype, "searchById", null);
__decorate([
    (0, routing_controllers_1.Post)("/search"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientContactController.prototype, "searchByFilters", null);
ClientContactController = __decorate([
    (0, routing_controllers_1.JsonController)("/api/client-contact")
], ClientContactController);
exports.ClientContactController = ClientContactController;
