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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const BullhornService_1 = require("../services/BullhornService");
const EmailService_1 = require("../services/EmailService");
const User_1 = require("../services/User");
const User_2 = require("../types/User");
const constant_1 = require("../utils/constant");
const jwtUtils_1 = require("../utils/jwtUtils");
const db_1 = __importDefault(require("../utils/db"));
let UserController = class UserController {
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = body;
            const _a = yield (0, User_1.login)(email, password), { result, error } = _a, data = __rest(_a, ["result", "error"]);
            if (result) {
                const token = (0, jwtUtils_1.CreateJwtToken)(data);
                return {
                    result,
                    token,
                };
            }
            return { result, error };
        });
    }
    /**
     * No-auth route for register page
     * @param user
     * @returns
     */
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = Object.assign({}, user);
            if (user.role === constant_1.CANDIDATE) {
                try {
                    const res = yield (yield BullhornService_1.BullhornService.getClient()).syncUserTppToBullhorn(user);
                    if (res && res.changedEntityId) {
                        console.log("changedEntityId", res.changedEntityId);
                        data = Object.assign(Object.assign({}, data), { externalId: res.changedEntityId });
                    }
                }
                catch (error) {
                    console.error("error syncing to BH");
                    console.error(error);
                }
                const { result, error } = yield (0, User_1.register)(data);
                return {
                    result,
                    error,
                };
            }
            else {
                return {
                    result: false,
                    error: `Invalid user type specified for candidate-only register route: ${user.role}`,
                };
            }
        });
    }
    /**
     * Coordinator-only route to add users depending on type
     * @param authUser
     * @param user
     * @returns
     */
    addUser(authUser, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = Object.assign({}, user);
            if (authUser.role !== constant_1.COORDINATOR) {
                return {
                    result: false,
                    error: "Only coordinators can add other users",
                };
            }
            const validRoles = [constant_1.COORDINATOR, constant_1.CANDIDATE, constant_1.COMPANY];
            if (!validRoles.includes(user.role)) {
                return {
                    result: false,
                    error: `Invalid role specified: ${user.role}`,
                };
            }
            if (user.role === constant_1.COORDINATOR) {
                const { result, error } = yield (0, User_1.register)(data);
                return {
                    result,
                    error,
                };
            }
            try {
                if (user.role === constant_1.COMPANY)
                    yield (0, EmailService_1.sendVerification)(user.email, user.companyName || "");
                else
                    yield (0, EmailService_1.sendVerification)(user.email, user.firstname || "");
            }
            catch (error) {
                return {
                    result: false,
                    error: "Please check email, email maybe invalid one",
                };
            }
            if (user.role === constant_1.CANDIDATE) {
                try {
                    const res = yield (yield BullhornService_1.BullhornService.getClient()).syncUserTppToBullhorn(user);
                    if (res && res.changedEntityId) {
                        console.log("changedEntityId", res.changedEntityId);
                        data = Object.assign(Object.assign({}, data), { externalId: res.changedEntityId });
                    }
                }
                catch (error) {
                    console.error("error syncing to BH");
                    console.error(error);
                }
                const { result, error } = yield (0, User_1.register)(data);
                return {
                    result,
                    error,
                };
            }
        });
    }
    setPassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token, new_password } = body;
            const data = (0, jwtUtils_1.VerifyJwtToken)(token);
            if (!data)
                return { result: false, error: "token is invalid" };
            const user = yield (0, User_1.findUserByEmail)(data.email);
            if (!user)
                return { result: false, error: "User does not exist" };
            user.password = new_password;
            return yield (0, User_1.update)(user.id, user.role, user);
        });
    }
    accountRecovery(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = body;
            return yield (0, User_1.recovery)(email);
        });
    }
    getHistory(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const history = yield db_1.default.history.findMany({
                    where: {
                        table: User_2.USER_TABLE,
                        recordId: authUser.id,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                });
                return history;
            }
            catch (err) {
                console.error(err);
                return null;
            }
        });
    }
    register_coordinator(user, authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = Object.assign({}, user);
            if (authUser.role !== constant_1.COORDINATOR) {
                return {
                    result: false,
                    error: "Only coordinators can make registration requests for other coordinators",
                };
            }
            return yield (0, User_1.register)(data);
        });
    }
    update(user, authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, User_1.update)(authUser.id, authUser.role, user);
        });
    }
    stats(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, User_1.getStats)(authUser.id);
        });
    }
    landingPageStats() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, User_1.getLandingPageStats)();
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)("/login"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, routing_controllers_1.Post)("/register"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)("/add-user"),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    (0, routing_controllers_1.Post)("/reset-password"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setPassword", null);
__decorate([
    (0, routing_controllers_1.Post)("/account-recovery"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "accountRecovery", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)("/user/history"),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getHistory", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)("/register_coordinator"),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register_coordinator", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)("/user/update"),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)("/stats"),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "stats", null);
__decorate([
    (0, routing_controllers_1.Get)("/landing-page-stats"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "landingPageStats", null);
UserController = __decorate([
    (0, routing_controllers_1.Controller)()
], UserController);
exports.UserController = UserController;
