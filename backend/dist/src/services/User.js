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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recovery = exports.getLandingPageStats = exports.getStats = exports.findUserByEmail = exports.login = exports.isExistUserFull = exports.isExistUser = exports.getUserById = exports.addUserHistoryEntries = exports.update = exports.register = void 0;
const User_1 = require("../types/User");
const BigQueryService_1 = require("./BigQueryService");
const Common_1 = require("../types/Common");
const constant_1 = require("../utils/constant");
const utils_1 = require("../utils");
const config_1 = __importDefault(require("../config"));
const db_1 = __importDefault(require("../utils/db"));
const password_1 = require("../utils/password");
const EmailService_1 = require("./EmailService");
const jwtUtils_1 = require("../utils/jwtUtils");
const isNullOrEmpty = (value) => {
    return !value || (value && !`${value}`.trim());
};
const validateUser = ({ firstname, lastname, email, password, role, city = "", state = "", resume, linkedin, skills, category, }) => {
    try {
        if (isNullOrEmpty(firstname) || isNullOrEmpty(lastname))
            return "firstname and lastname is required";
        if (isNullOrEmpty(email))
            return "email is invalid";
        if (constant_1.ROLES.find((r) => r === role) === null)
            return `role is invalid, it should be one in [${constant_1.ROLES.join(", ")}]`;
        if (isNullOrEmpty(password))
            return "password is required";
        // if (isNullOrEmpty(resume))
        //     return 'resume is required';
        // if (isNullOrEmpty(linkedin))
        //     return 'linkedin is required';
        // if (isNullOrEmpty(skills))
        //     return 'skill is required';
        // if (isNullOrEmpty(category))
        //     return 'category is required';
    }
    catch (error) {
        return "something is wrong, please check params";
    }
    return false;
};
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("registering...");
        const validate = validateUser(data);
        if (validate) {
            console.log("failed validation", validate);
            return { result: false, error: validate };
        }
        const user = (0, utils_1.justifyData)(data, User_1.USERKEYS);
        const existing = yield (0, exports.isExistUser)("email", user.email);
        if (existing) {
            console.log("user exists");
            return {
                result: false,
                error: `User with ${user.email} exists`,
            };
        }
        const savingData = {
            data: Object.assign(Object.assign({}, data), { password: (0, password_1.encryptPassword)(user.password) }),
        };
        if (data.role !== 'coordinator') {
            savingData.data.category = {
                connect: {
                    id: Number(data.category),
                },
            };
        }
        ;
        yield db_1.default.user.create(savingData);
        console.log("success");
        if (process.env.FRONTEND_URL) {
            yield (0, EmailService_1.sendNewUserNotification)(user.email, user.firstname || "");
        }
        return { result: true };
    }
    catch (error) {
        console.error(error);
        return { result: false, error };
    }
});
exports.register = register;
const update = (parent_id, role, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = data.id;
        const id = user_id || parent_id;
        if (user_id && role !== constant_1.COORDINATOR && parent_id !== user_id) {
            return {
                result: false,
                error: "You should be a coordinator for updating this user",
            };
        }
        const user = (0, utils_1.justifyData)(data, User_1.USERKEYS, ["email", "id"]);
        if (user && user.role && !constant_1.ROLES.find((role) => role === user.role)) {
            return {
                result: false,
                error: `Invalid Role (candidate, coordinator, company)`,
            };
        }
        const existing = yield (0, exports.isExistUserFull)("id", id);
        if (!existing) {
            return {
                result: false,
                error: `User with id=${id} doesn't exist`,
            };
        }
        if (user.password) {
            user.password = (0, password_1.encryptPassword)(user.password);
        }
        if (existing.externalId) {
            try {
                // TODO: add bullhorn api update here
            }
            catch (error) {
                console.error("Could not update user in bullhorn", error);
            }
        }
        const updated = yield db_1.default.user.update({
            where: {
                id: existing.id,
            },
            data: user,
        });
        try {
            yield (0, exports.addUserHistoryEntries)({
                updatedUser: user,
                existingUser: existing,
            });
        }
        catch (err) {
            console.log("could not add user history:", user);
            console.log(err);
        }
        (0, password_1.clearPassword)(updated);
        if (config_1.default.sendgridSecret) {
            yield (0, EmailService_1.sendUpdateUserNotification)(updated.email, updated.firstname);
        }
        return { result: true, data: updated };
    }
    catch (error) {
        console.error(error);
        return { result: false, error };
    }
});
exports.update = update;
const addUserHistoryEntries = ({ updatedUser, existingUser, }) => __awaiter(void 0, void 0, void 0, function* () {
    const batchId = (0, utils_1.genUUID)();
    const historyRecords = Object.keys(updatedUser)
        .filter((key) => {
        const typedKey = key;
        const newValue = updatedUser[typedKey];
        const oldValue = existingUser[typedKey];
        return newValue !== oldValue;
    })
        .map((key) => {
        var _a, _b;
        const typedKey = key;
        return {
            table: User_1.USER_TABLE,
            recordId: existingUser.id,
            column: key,
            oldValue: existingUser[typedKey] != null
                ? (_a = existingUser[typedKey]) === null || _a === void 0 ? void 0 : _a.toString()
                : null,
            newValue: updatedUser[typedKey] != null
                ? (_b = updatedUser[typedKey]) === null || _b === void 0 ? void 0 : _b.toString()
                : null,
            batchId,
        };
    });
    return yield db_1.default.history.createMany({
        data: historyRecords,
    });
});
exports.addUserHistoryEntries = addUserHistoryEntries;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.default.user.findFirst({
            where: {
                id,
            },
        });
        return { result: true, data: user };
    }
    catch (error) {
        return { result: false, error };
    }
});
exports.getUserById = getUserById;
const isExistUser = (field, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield (0, exports.isExistUserFull)(field, value)) != null;
    }
    catch (error) {
        console.log(error);
        return true;
    }
});
exports.isExistUser = isExistUser;
const isExistUserFull = (field, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.default.user.findFirst({
            where: {
                [field]: value,
            },
        });
        return user || null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.isExistUserFull = isExistUserFull;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield db_1.default.user.findFirst({
            where: {
                email,
            },
        });
        if (existingUser && (0, password_1.checkPassword)(existingUser.password, password)) {
            return Object.assign(Object.assign({ result: true }, (0, password_1.clearPassword)(existingUser)), { companyId: existingUser.companyId, user_id: existingUser.id });
        }
        else {
            console.log("no existing user");
            return { result: false, error: "wrong credential" };
        }
    }
    catch (error) {
        console.log(error);
        return { result: false, error };
    }
});
exports.login = login;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.default.user.findFirst({
            where: {
                email,
            },
        });
        return user || null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.findUserByEmail = findUserByEmail;
const getStats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applicationCountQuery = `SELECT COUNT(*) as count FROM \`${Common_1.DATASET_MAIN}.${Common_1.Tables.APPLICATIONS}\` 
                    INNER JOIN \`${Common_1.DATASET_MAIN}.${Common_1.Tables.JOBS}\`
                    ON \`${Common_1.DATASET_MAIN}.${Common_1.Tables.JOBS}\`.\`id\` = \`${Common_1.DATASET_MAIN}.${Common_1.Tables.APPLICATIONS}\`.\`job\`
                    OR \`${Common_1.DATASET_MAIN}.${Common_1.Tables.JOBS}\`.\`externalId\` = \`${Common_1.DATASET_MAIN}.${Common_1.Tables.APPLICATIONS}\`.\`job\`
                    WHERE \`${Common_1.DATASET_MAIN}.${Common_1.Tables.APPLICATIONS}\`.\`candidate\` = '${userId}'`;
        const savedJobsCountQuery = `SELECT COUNT(*) as count FROM \`${Common_1.DATASET_MAIN}.${Common_1.Tables.SAVEDJOBS}\`
                                    WHERE candidate = '${userId}'`;
        const totalJobsCountQuery = `SELECT COUNT(*) as count FROM \`${Common_1.DATASET_BULLHORN}.${Common_1.Tables.JOBS}\``;
        const savedCompaniesCountQuery = `SELECT COUNT(*) as count FROM \`${Common_1.DATASET_MAIN}.${Common_1.Tables.SAVED_COMPANIES}\`
                                        WHERE candidate = '${userId}'`;
        const totalCompaniesCountQuery = `SELECT COUNT(*) as count FROM \`${Common_1.DATASET_BULLHORN}.${Common_1.Tables.COMPANIES}\``;
        const applicationCountPromise = BigQueryService_1.BigQueryService.getClient().query({
            query: applicationCountQuery,
            location: "US",
        });
        const savedJobsCountPromise = BigQueryService_1.BigQueryService.getClient().query({
            query: savedJobsCountQuery,
            location: "US",
        });
        const totalJobsCountPromise = BigQueryService_1.BigQueryService.getClient().query({
            query: totalJobsCountQuery,
            location: "US",
        });
        const savedCompaniesCountPromise = BigQueryService_1.BigQueryService.getClient().query({
            query: savedCompaniesCountQuery,
            location: "US",
        });
        const totalCompaniesCountPromise = BigQueryService_1.BigQueryService.getClient().query({
            query: totalCompaniesCountQuery,
            location: "US",
        });
        const [[applicationCount], [savedJobsCount], [totalJobsCount], [savedCompaniesCount], [totalCompaniesCount],] = yield Promise.all([
            applicationCountPromise,
            savedJobsCountPromise,
            totalJobsCountPromise,
            savedCompaniesCountPromise,
            totalCompaniesCountPromise,
        ]);
        return {
            result: true,
            applicationCount: applicationCount[0].count,
            savedJobsCount: savedJobsCount[0].count,
            totalJobsCount: totalJobsCount[0].count,
            savedCompaniesCount: savedCompaniesCount[0].count,
            totalCompaniesCount: totalCompaniesCount[0].count,
            message: null,
        };
    }
    catch (error) {
        return {
            result: false,
            applicationCount: null,
            savedJobsCount: null,
            totalJobsCount: null,
            savedCompaniesCount: null,
            totalCompaniesCount: null,
            message: error,
        };
    }
});
exports.getStats = getStats;
const getLandingPageStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const activeStatuses = ["Active", "Open"];
    try {
        const totalJobsCountPromise = db_1.default.job.count({
            where: {
                status: {
                    in: activeStatuses,
                }
            }
        });
        const totalCompaniesCountPromise = db_1.default.company.count({
            where: {
                status: {
                    in: activeStatuses,
                }
            }
        });
        const [totalJobsCount, totalCompaniesCount] = yield Promise.all([
            totalJobsCountPromise,
            totalCompaniesCountPromise,
        ]);
        return {
            result: true,
            totalJobsCount,
            totalCompaniesCount,
            message: null,
        };
    }
    catch (error) {
        return {
            result: false,
            totalJobsCount: null,
            totalCompaniesCount: null,
            message: error,
        };
    }
});
exports.getLandingPageStats = getLandingPageStats;
const recovery = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, exports.findUserByEmail)(email);
        if (!user)
            return { result: false, error: "User does not exist" };
        const token = (0, jwtUtils_1.CreateJwtToken)({ email: user.email });
        yield (0, EmailService_1.sendResetPassword)(email, user.firstname, token);
        return { result: true };
    }
    catch (error) {
        console.log(error);
        return { result: false, error };
    }
});
exports.recovery = recovery;
