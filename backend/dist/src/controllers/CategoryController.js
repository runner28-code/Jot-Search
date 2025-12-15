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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const routing_controllers_1 = require("routing-controllers");
const Category_1 = require("../services/Category");
let CategoryController = class CategoryController {
    searchByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _filters = [
                    {
                        key: "id",
                        value: id,
                    },
                ];
                const category = yield (0, Category_1.getCategoriesByFilter)(_filters, undefined, 1);
                return {
                    category: category === null || category === void 0 ? void 0 : category[0],
                    message: null,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    category: undefined,
                    message: error,
                };
            }
        });
    }
    searchByFilter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filters, fields, page, count, operator } = body;
                const categories = yield (0, Category_1.getCategoriesByFilter)(filters, fields || [], count, operator);
                return {
                    categories,
                    total: categories === null || categories === void 0 ? void 0 : categories.length,
                    message: null,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    message: error,
                };
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/search"),
    __param(0, (0, routing_controllers_1.QueryParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "searchByID", null);
__decorate([
    (0, routing_controllers_1.Post)("/search"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "searchByFilter", null);
CategoryController = __decorate([
    (0, routing_controllers_1.JsonController)("/api/category")
], CategoryController);
exports.CategoryController = CategoryController;
