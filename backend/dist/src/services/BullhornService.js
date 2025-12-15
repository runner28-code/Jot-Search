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
exports.BullhornService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const query_string_1 = __importDefault(require("query-string"));
const BullhornCrud_1 = require("../utils/BullhornCrud");
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../utils");
const db_1 = __importDefault(require("../utils/db"));
const EmailService_1 = require("./EmailService");
const constant_1 = require("../utils/constant");
class BullhornService {
    constructor() {
        this.auth_code = null;
        this.access_token = null;
        this.refresh_token = null;
        this.BhRestToken = null;
        this.restUrl = null;
        this.corpToken = null;
        this.oauth_url = "https://auth.bullhornstaffing.com/oauth";
        this.api_base_url = "https://rest.bullhornstaffing.com/rest-services";
        this.makeListArray = (val) => {
            if (!val)
                return [];
            return val === null || val === void 0 ? void 0 : val.toString().replace(", ", ",").split(",");
        };
    }
    static getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            if (BullhornService.client === null) {
                BullhornService.client = new BullhornService();
                yield BullhornService.client.init(false);
            }
            return BullhornService.client;
        });
    }
    init(invalid = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!invalid) {
                const cookie = yield this.getCookie();
                if (cookie !== null) {
                    const { auth_code, access_token, refresh_token, BhRestToken, restUrl } = cookie;
                    this.auth_code = auth_code;
                    this.access_token = access_token;
                    this.refresh_token = refresh_token;
                    this.BhRestToken = BhRestToken;
                    this.restUrl = restUrl;
                    if (this.auth_code &&
                        this.access_token &&
                        this.refresh_token &&
                        this.BhRestToken &&
                        this.restUrl)
                        return true;
                }
            }
            if (yield this.getAuthCode()) {
                if (yield this.getAccessToken())
                    return yield this.login();
            }
            return false;
        });
    }
    getCookie() {
        return __awaiter(this, void 0, void 0, function* () {
            const targetFile = __dirname + "/../config/cookie.json";
            return new Promise((resolve) => {
                fs_1.default.readFile(targetFile, function (err, data) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return resolve(null);
                        }
                        let cookies = JSON.parse(data.toString());
                        return resolve(cookies);
                    });
                });
            });
        });
    }
    setCookie(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetFile = __dirname + "/../config/cookie.json";
            return new Promise((resolve, reject) => {
                // Try saving the file.
                fs_1.default.writeFile(targetFile, JSON.stringify(data), { flag: "w+" }, (err) => {
                    if (err)
                        reject(err);
                    else {
                        resolve(targetFile);
                    }
                });
            });
        });
    }
    getAuthCode() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n***** getAuthCode *****");
            const query = query_string_1.default.stringify({
                client_id: config_1.default.bullhornClientID,
                response_type: "code",
                action: "Login",
                username: config_1.default.bullhornApiUsername,
                password: config_1.default.bullhornApiPassword,
            }, { encode: false });
            const url = `${this.oauth_url}/authorize?${query}`;
            console.log("url =", url);
            const res = yield axios_1.default.get(url);
            if (res.status === 200) {
                const path = res.request.path;
                console.log("path =", path);
                this.auth_code = path
                    .slice(7, path.indexOf("&client"))
                    .replace("%25", "%");
                console.log("Auth Code: ", this.auth_code);
                return true;
            }
            return false;
        });
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n***** getAccessToken *****");
            const query = query_string_1.default.stringify({
                grant_type: "authorization_code",
                client_id: config_1.default.bullhornClientID,
                client_secret: config_1.default.bullhornClientSecret,
                code: this.auth_code,
            }, { encode: false });
            const url = `${this.oauth_url}/token?${query}`;
            console.log(url);
            const res = yield axios_1.default.post(url);
            console.log(res.status);
            console.log(res);
            console.log("============================ \n");
            if (res.status === 200) {
                const { access_token, refresh_token } = res.data;
                this.access_token = access_token;
                this.refresh_token = refresh_token;
                console.log("Access Token: ", this.access_token);
                console.log("Refresh Token: ", this.refresh_token);
                return true;
            }
            return yield this.getNewAccessToken();
        });
    }
    getNewAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n***** getNewAccessToken *****");
            try {
                const query = query_string_1.default.stringify({
                    grant_type: "refresh_token",
                    client_id: config_1.default.bullhornClientID,
                    client_secret: config_1.default.bullhornClientSecret,
                    refresh_token: this.refresh_token,
                }, { encode: false });
                const url = `${this.oauth_url}/token?${query}`;
                console.log("access token url: ", url);
                const res = yield axios_1.default.post(url);
                console.log(res.status);
                if (res.status === 200) {
                    const { access_token, refresh_token } = res.data;
                    this.access_token = access_token;
                    this.refresh_token = refresh_token;
                    return yield this.login();
                }
                return yield this.init();
            }
            catch (error) {
                console.log("Error on getNewAccessToken", error.message);
                return yield this.init();
            }
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n***** login *****");
            let retryNo = 0;
            while (retryNo < 3) {
                try {
                    const query = query_string_1.default.stringify({
                        version: "*",
                        access_token: this.access_token,
                    }, { encode: false });
                    const url = `${this.api_base_url}/login?${query}`;
                    const res = yield axios_1.default.post(url);
                    if (res.status === 200) {
                        const { BhRestToken, restUrl } = res.data;
                        this.BhRestToken = BhRestToken;
                        this.restUrl = restUrl;
                        this.corpToken = restUrl.split("/")[4];
                        console.log("BhRestToken: ", this.BhRestToken);
                        console.log("restUrl: ", this.restUrl);
                        console.log("corpToken: ", this.corpToken);
                        yield this.setCookie({
                            auth_code: this.auth_code,
                            access_token: this.access_token,
                            refresh_token: this.refresh_token,
                            BhRestToken: this.BhRestToken,
                            restUrl: this.restUrl,
                        });
                        return true;
                    }
                    else if (res.status === 400) {
                        yield this.getNewAccessToken();
                    }
                }
                catch (error) {
                    console.log(error.message);
                    yield (0, utils_1.sleep)(1000);
                    retryNo++;
                    console.log("\nxxxxx login failed: retrying now");
                }
            }
            return false;
        });
    }
    getCompanies(testMode = false, count = 50, sort = "-dateAdded") {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n***** getAllCompanies *****");
            let offset = 0;
            let total = 100000;
            let repeatErr = 0;
            while (repeatErr < 3) {
                console.log(`\nBullhorn_GET_COMPANY: ${total} / ${offset}`);
                try {
                    const query = query_string_1.default.stringify({
                        BhRestToken: this.BhRestToken,
                        fields: [
                            "id",
                            "address",
                            "annualRevenue",
                            "billingAddress",
                            "billingContact",
                            "billingFrequency",
                            "billingPhone",
                            "businessSectorList",
                            "companyDescription",
                            "companyURL",
                            "competitors",
                            "culture",
                            "dateAdded",
                            "dateFounded",
                            "dateLastModified",
                            "externalID",
                            "feeArrangement",
                            "funding",
                            "industryList",
                            "name",
                            "notes",
                            "numEmployees",
                            "numOffices",
                            "phone",
                            "status",
                            "taxRate",
                            "tickerSymbol",
                            "workWeekStart",
                        ].join(","),
                        query: "id:[* TO *]  AND NOT status:Archive",
                        start: offset,
                        count,
                        sort,
                    });
                    const url = `${this.restUrl}search/ClientCorporation?${query}`;
                    const res = yield axios_1.default.get(url, {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                        },
                    });
                    if (res.status === 200) {
                        const { data, count } = res.data;
                        total = res.data.total;
                        const updatedData = data.map((d) => (Object.assign(Object.assign({}, d), { id: `bl-${d.id}`, businessSectorList: d.businessSectorList || [], industryList: d.industryList || [], competitors: d.competitors || [] })));
                        if (!testMode) {
                            const res = yield (0, BullhornCrud_1.saveCompanies)(updatedData);
                            if (res === -1)
                                return -1;
                        }
                        offset += count;
                        repeatErr = 0;
                        if (total <= offset)
                            break;
                    }
                    else if (res.status === 404) {
                        break;
                    }
                    else {
                        console.log(url);
                        throw "error";
                    }
                }
                catch (error) {
                    console.log(error, "\nrepeatNumber =", repeatErr);
                    repeatErr++;
                    yield this.getNewAccessToken();
                }
            }
        });
    }
    insertCompany(company) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n***** insertCompany *****");
            try {
                const query = query_string_1.default.stringify({
                    BhRestToken: this.BhRestToken,
                });
                const url = `${this.restUrl}entity/ClientCorporation?${query}`;
                console.log(url);
                const res = yield axios_1.default.put(url, JSON.stringify(company), {
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Accept: "*/*",
                    },
                });
                if (res.status === 200) {
                    console.log("insertCompany success");
                    const bullhornId = res.data.changedEntityId;
                    const newDbCompany = Object.assign(Object.assign({}, company), { id: `bl-${bullhornId}`, address_address1: ((_a = company.address) === null || _a === void 0 ? void 0 : _a.address1) || null, address_address2: ((_b = company.address) === null || _b === void 0 ? void 0 : _b.address2) || null, address_city: ((_c = company.address) === null || _c === void 0 ? void 0 : _c.city) || null, address_state: ((_d = company.address) === null || _d === void 0 ? void 0 : _d.state) || null, address_zip: ((_e = company.address) === null || _e === void 0 ? void 0 : _e.zip) || null, address_country_id: ((_f = company.address) === null || _f === void 0 ? void 0 : _f.countryID) || null, billingAddress_address1: ((_g = company.bllingAddress) === null || _g === void 0 ? void 0 : _g.address1) || null, billingAddress_address2: ((_h = company.bllingAddress) === null || _h === void 0 ? void 0 : _h.address2) || null, billingAddress_city: ((_j = company.bllingAddress) === null || _j === void 0 ? void 0 : _j.city) || null, billingAddress_state: ((_k = company.bllingAddress) === null || _k === void 0 ? void 0 : _k.state) || null, billingAddress_zip: ((_l = company.bllingAddress) === null || _l === void 0 ? void 0 : _l.zip) || null });
                    yield (0, BullhornCrud_1.saveCompanies)([newDbCompany]);
                    return {
                        result: true,
                        newDbCompany,
                    };
                }
                else {
                    console.log("insertCompany failed");
                    return {
                        result: false,
                        error: res.data.error,
                    };
                }
            }
            catch (err) {
                console.log(err);
                return {
                    result: false,
                    message: err,
                };
            }
        });
    }
    getJobs(testMode = false, count = 1000, sort = "-dateAdded") {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n***** getJobs *****");
            let offset = 0;
            let total = 100000;
            let repeatErr = 0;
            while (repeatErr < 3) {
                console.log(`\nBullhorn_GET_JOBS: ${total} / ${offset}`);
                try {
                    const query = query_string_1.default.stringify({
                        BhRestToken: this.BhRestToken,
                        fields: constant_1.JOB_FIELDS.join(","),
                        query: "isDeleted: 0",
                        start: offset,
                        count,
                        sort,
                    });
                    const url = `${this.restUrl}search/JobOrder?${query}`;
                    const res = yield axios_1.default.get(url, {
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                            Accept: "*/*",
                        },
                    });
                    console.log(url);
                    if (res.status === 200) {
                        const { data } = res.data;
                        total = res.data.total;
                        this.saveJobFunc(data);
                        if (total <= offset)
                            break;
                        offset += count;
                        repeatErr = 0;
                    }
                    else if (res.status === 404) {
                        break;
                    }
                    else {
                        console.log(url);
                        throw "error";
                    }
                }
                catch (error) {
                    console.log(error.message, "\nrepeatNumber =", repeatErr);
                    yield this.getNewAccessToken();
                    repeatErr++;
                }
            }
        });
    }
    saveJobFunc(data, testMode = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedData = data.map((d) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
                const { owner, isClientEditable, feeArrangement, externalID, clientContact, id, categories } = d, otherData = __rest(d, ["owner", "isClientEditable", "feeArrangement", "externalID", "clientContact", "id", "categories"]);
                const categoryId = ((_a = d.categories) === null || _a === void 0 ? void 0 : _a.total) === 0 ? null : (_b = d.categories) === null || _b === void 0 ? void 0 : _b.data[0].id;
                return Object.assign(Object.assign({}, otherData), { skillList: this.makeListArray(d.skillList), certificationList: this.makeListArray(d.certificationList), degreeList: this.makeListArray(d.degreeList), isPublic: Boolean(d.isPublic), externalId: `bl-${d.id}`, country_id: ((_d = (_c = d.address) === null || _c === void 0 ? void 0 : _c.countryID) === null || _d === void 0 ? void 0 : _d.toString()) || null, address1: ((_e = d.address) === null || _e === void 0 ? void 0 : _e.address1) || null, address2: ((_f = d.address) === null || _f === void 0 ? void 0 : _f.address2) || null, city: ((_g = d.address) === null || _g === void 0 ? void 0 : _g.city) || null, state: ((_h = d.address) === null || _h === void 0 ? void 0 : _h.state) || null, zip: ((_j = d.address) === null || _j === void 0 ? void 0 : _j.zip) || null, clientContactID: (_k = d.clientContact) === null || _k === void 0 ? void 0 : _k.id.toString(), clientCorporationID: (_l = d.clientCorporation) === null || _l === void 0 ? void 0 : _l.id.toString(), interviews: ((_m = d.interviews) === null || _m === void 0 ? void 0 : _m.total) || 0, ownerID: (_p = (_o = d.owner) === null || _o === void 0 ? void 0 : _o.id) === null || _p === void 0 ? void 0 : _p.toString(), dateAdded: d.dateAdded, dateClosed: d.dateClosed, dateEnd: d.date_end, dateLastExported: d.dateLastExported, dateLastModified: d.dateLastModified, dateLastPublished: d.dateLastPublished, datasource: "bullhorn", companyId: `bl-${(_q = d.clientCorporation) === null || _q === void 0 ? void 0 : _q.id.toString()}`, categoryId: categoryId });
            });
            if (!testMode) {
                for (const job of updatedData) {
                    console.log("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    const res = yield (0, BullhornCrud_1.saveBullhornJobs)([job]);
                    if (res === -1) {
                        return;
                    }
                }
            }
        });
    }
    getClientContacts(testMode = false, count = 50, sort = "-dateAdded") {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n***** getClientContacts *****");
            let offset = 0;
            let total = 100000;
            let repeatErr = 0;
            while (repeatErr < 3) {
                console.log(`\nBullhorn_GET_CLIENTCONTACTS: ${total} / ${offset}`);
                try {
                    const query = query_string_1.default.stringify({
                        BhRestToken: this.BhRestToken,
                        fields: [
                            "id",
                            "address",
                            "category",
                            "certifications",
                            "clientCorporation",
                            "comments",
                            "dateAdded",
                            "dateLastModified",
                            "dateLastVisit",
                            "description",
                            "desiredCategories",
                            "desiredSkills",
                            "desiredSpecialties",
                            "division",
                            "email",
                            "email2",
                            "email3",
                            "externalID",
                            "fax",
                            "fax2",
                            "fax3",
                            "firstName",
                            "isAnonymized",
                            "isDayLightSavings",
                            "isDeleted",
                            "lastName",
                            "leads",
                            "middleName",
                            "mobile",
                            "name",
                            "namePrefix",
                            "nameSuffix",
                            "nickName",
                            "numEmployees",
                            "occupation",
                            "office",
                            "owner",
                            "pager",
                            "password",
                            "phone",
                            "phone2",
                            "phone3",
                            "preferredContact",
                            "skills",
                            "source",
                        ].join(","),
                        query: "isDeleted:0  AND NOT status:Archive NOT clientCorporation.status:Archive",
                        start: offset,
                        count,
                        sort,
                    });
                    const url = `${this.restUrl}search/ClientContact?${query}`;
                    const res = yield axios_1.default.get(url, {
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                            Accept: "*/*",
                        },
                    });
                    if (res.status === 200) {
                        const { data } = res.data;
                        total = res.data.total;
                        const updatedData = data.map((d) => {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                            return (Object.assign(Object.assign({}, d), { id: `bl-${d.id}`, address_address1: ((_a = d.address) === null || _a === void 0 ? void 0 : _a.address1) || null, address_address2: ((_b = d.address) === null || _b === void 0 ? void 0 : _b.address2) || null, address_city: ((_c = d.address) === null || _c === void 0 ? void 0 : _c.city) || null, address_state: ((_d = d.address) === null || _d === void 0 ? void 0 : _d.state) || null, address_zip: ((_e = d.address) === null || _e === void 0 ? void 0 : _e.zip) || null, address_country_id: ((_f = d.address) === null || _f === void 0 ? void 0 : _f.countryID) || null, category: `${(_g = d.category) === null || _g === void 0 ? void 0 : _g.id}-${(_h = d.category) === null || _h === void 0 ? void 0 : _h.name}`, clientCorporation: `${(_j = d.clientCorporation) === null || _j === void 0 ? void 0 : _j.id}`, leads: (_k = d.leads) === null || _k === void 0 ? void 0 : _k.data.map((lead) => lead.id).join(" | "), owner: `${(_l = d.owner) === null || _l === void 0 ? void 0 : _l.id}`, skills: (_m = d.skills) === null || _m === void 0 ? void 0 : _m.data.map((skill) => skill.id).join(" | "), dateAdded: new Date(d.dateAdded), dateLastModified: new Date(d.dateLastModified) }));
                        });
                        if (!testMode) {
                            const res = yield (0, BullhornCrud_1.saveClientContacts)(updatedData);
                            if (res === -1)
                                return;
                        }
                        offset += count;
                        repeatErr = 0;
                        if (total <= offset)
                            break;
                    }
                    else if (res.status === 404) {
                        return [];
                    }
                    else {
                        console.log(url);
                        throw "error";
                    }
                }
                catch (error) {
                    console.log(error.message, "\nrepeatNumber =", repeatErr);
                    yield this.getNewAccessToken();
                    repeatErr++;
                }
            }
        });
    }
    getCandidates(testMode = false, count = 150, sort = "-dateAdded") {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n***** getCandidates *****");
            let offset = 0;
            let total = 100000;
            let repeatErr = 0;
            while (repeatErr < 3) {
                console.log(`\nBullhorn_GET_CANDIDATES: ${total} / ${offset}`);
                try {
                    const query = query_string_1.default.stringify({
                        BhRestToken: this.BhRestToken,
                        fields: [
                            "id",
                            "address",
                            "certifications",
                            "comments",
                            "companyName",
                            "companyURL",
                            "category",
                            // "customInt6",
                            "dateAdded",
                            "dateAvailable",
                            "dateAvailableEnd",
                            "dateI9Expiration",
                            "dateLastComment",
                            "dateLastModified",
                            "dateNextCall",
                            "dateOfBirth",
                            "dayRate",
                            "dayRateLow",
                            "degreeList",
                            "description",
                            "desiredLocations",
                            "disability",
                            "educationDegree",
                            "email",
                            "email2",
                            "email3",
                            "employeeType",
                            "employmentPreference",
                            "ethnicity",
                            "experience",
                            // "externalID",
                            "fax",
                            "fax2",
                            "fax3",
                            "firstName",
                            "gender",
                            "hourlyRate",
                            "hourlyRateLow",
                            // "i9OnFile",
                            "isAnonymized",
                            "isDeleted",
                            "isEditable",
                            "isExempt",
                            "lastName",
                            "leads",
                            "maritalStatus",
                            "massMailOptOut",
                            "middleName",
                            "mobile",
                            "name",
                            "namePrefix",
                            "nameSuffix",
                            "nickName",
                            "numCategories",
                            "numOwners",
                            "occupation",
                            "otherDeductionsAmount",
                            "otherIncomeAmount",
                            "pager",
                            "paperWorkOnFile",
                            "password",
                            "payrollClientStartDate",
                            "payrollStatus",
                            "phone",
                            "phone2",
                            "phone3",
                            "preferredContact",
                            "primarySkills",
                            "recentClientList",
                            "referredBy",
                            "salary",
                            "salaryLow",
                            "secondarySkills",
                            "skillSet",
                            "smsOptIn",
                            "source",
                            // "specialties",
                            "ssn",
                            // "stateAddtionalWitholdingsAmount",
                            "stateExemptions",
                            "stateFilingStatus",
                            "status",
                            "taxID",
                            "taxState",
                            "timeZoneOffsetEST",
                            "tobaccoUser",
                            "totalDependentClaimAmount",
                            "travelLimit",
                            "travelMethod",
                            "twoJobs",
                            "type",
                            "userDateAdded",
                            "username",
                            "veteran",
                            "willRelocate",
                            "workAuthorized",
                        ].join(","),
                        query: "isDeleted:0  AND NOT status:Archive",
                        start: offset,
                        count,
                        sort,
                    });
                    const url = `${this.restUrl}search/Candidate?${query}`;
                    const res = yield axios_1.default.get(url, {
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                            Accept: "*/*",
                        },
                    });
                    if (res.status === 200) {
                        const { data, count } = res.data;
                        total = res.data.total;
                        const updatedData = data.map((d) => {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                            const { category } = d, otherData = __rest(d, ["category"]);
                            return Object.assign(Object.assign({}, otherData), { id: `bl-${d.id}`, address_address1: ((_a = d.address) === null || _a === void 0 ? void 0 : _a.address1) || null, address_address2: ((_b = d.address) === null || _b === void 0 ? void 0 : _b.address2) || null, address_city: ((_c = d.address) === null || _c === void 0 ? void 0 : _c.city) || null, address_state: ((_d = d.address) === null || _d === void 0 ? void 0 : _d.state) || null, address_zip: ((_e = d.address) === null || _e === void 0 ? void 0 : _e.zip) || null, address_country_id: ((_f = d.address) === null || _f === void 0 ? void 0 : _f.countryID) || null, leads: (_g = d.leads) === null || _g === void 0 ? void 0 : _g.data.map((lead) => lead.id).join(" | "), primarySkills: (_h = d.primarySkills) === null || _h === void 0 ? void 0 : _h.data.map((skill) => skill.name).join(" | "), secondarySkills: (_j = d.secondarySkills) === null || _j === void 0 ? void 0 : _j.data.map((skill) => skill.name).join(" | "), specialties: (_k = d.specialties) === null || _k === void 0 ? void 0 : _k.data.map((specialty) => specialty.name).join(" | "), userDateAdded: new Date(d.userDateAdded), dateAdded: new Date(d.dateAdded), dateLastModified: new Date(d.dateLastModified), externalId: d.externalID, dateLastComment: new Date(d.dateLastComment), dateOfBirth: new Date(d.dateOfBirth), ethnicity: d.ethnicity || [], recentClientList: d.recentClientList || [], employmentPreference: d.employmentPreference || [], dateAvailable: new Date(d.dateAvailable), desiredLocations: d.desiredLocations || [], degreeList: d.degreeList || [], categoryId: category.id });
                        });
                        if (!testMode) {
                            console.log("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                            const res = yield (0, BullhornCrud_1.saveCandidates)(updatedData);
                            // if (res === -1) return;
                        }
                        offset += count;
                        repeatErr = 0;
                        if (total <= offset)
                            break;
                    }
                    else if (res.status === 404) {
                        return [];
                    }
                    else {
                        console.log(url);
                        throw "error";
                    }
                }
                catch (error) {
                    console.log(error.message, "\nrepeatNumber =", repeatErr);
                    yield this.getNewAccessToken();
                    repeatErr++;
                }
            }
        });
    }
    getLeads(testMode = false, count = 150, sort = "-dateAdded") {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n***** getLeads *****");
            let offset = 0;
            let total = 100000;
            let repeatErr = 0;
            while (repeatErr < 3) {
                console.log(`\nBullhorn_GET_LEADS: ${total} / ${offset}`);
                try {
                    const query = query_string_1.default.stringify({
                        BhRestToken: this.BhRestToken,
                        fields: [
                            "id",
                            "address",
                            "campaignSource",
                            "candidates",
                            "category",
                            "clientContacts",
                            "clientCorporation",
                            "comments",
                            "companyName",
                            "companyURL",
                            "dateAdded",
                            "dateLastComment",
                            "dateLastModified",
                            "description",
                            "division",
                            "email",
                            "email2",
                            "email3",
                            "fax",
                            "fax2",
                            "fax3",
                            "firstName",
                            "isAnonymized",
                            "isDeleted",
                            "lastName",
                            "leadSource",
                            "massMailOptOut",
                            "middleName",
                            "mobile",
                            "name",
                            "namePrefix",
                            "nameSuffix",
                            "nickName",
                            "notes",
                            "numEmployees",
                            "occupation",
                            "owner",
                            "pager",
                            "phone",
                            "phone2",
                            "phone3",
                            "preferredContact",
                            "primarySkills",
                            "priority",
                            "referredByPerson",
                            "reportToPerson",
                            "role",
                            "salary",
                            "salaryLow",
                            "secondarySkills",
                            "skillSet",
                            "smsOptIn",
                            "specialties",
                            "status",
                            "timeZoneOffsetEST",
                            "type",
                            "willRelocate",
                        ].join(","),
                        query: "isDeleted:0  AND NOT status:Archive",
                        start: offset,
                        count,
                        sort,
                    });
                    const url = `${this.restUrl}search/Lead?${query}`;
                    console.log(url);
                    const res = yield axios_1.default.get(url, {
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                            Accept: "*/*",
                        },
                    });
                    if (res.status === 200) {
                        const { data } = res.data;
                        total = res.data.total;
                        const updatedData = data.map((d) => {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                            return (Object.assign(Object.assign({}, d), { id: `bl-${d.id}`, address_address1: ((_a = d.address) === null || _a === void 0 ? void 0 : _a.address1) || null, address_address2: ((_b = d.address) === null || _b === void 0 ? void 0 : _b.address2) || null, address_city: ((_c = d.address) === null || _c === void 0 ? void 0 : _c.city) || null, address_state: ((_d = d.address) === null || _d === void 0 ? void 0 : _d.state) || null, address_zip: ((_e = d.address) === null || _e === void 0 ? void 0 : _e.zip) || null, address_country_id: ((_f = d.address) === null || _f === void 0 ? void 0 : _f.countryID) || null, candidates: (_g = d.candidates) === null || _g === void 0 ? void 0 : _g.data.map((candidate) => candidate.id).join(" | "), clientContacts: (_h = d.clientContacts) === null || _h === void 0 ? void 0 : _h.data.map((clientContact) => clientContact.id).join(" | "), primarySkills: (_j = d.primarySkills) === null || _j === void 0 ? void 0 : _j.data.map((skill) => skill.name).join(" | "), secondarySkills: (_k = d.secondarySkills) === null || _k === void 0 ? void 0 : _k.data.map((skill) => skill.name).join(" | "), specialties: (_l = d.specialties) === null || _l === void 0 ? void 0 : _l.data.map((specialty) => specialty.name).join(" | "), dateAdded: new Date(d.dateAdded), dateLastComment: new Date(d.dateLastComment), dateLastModified: new Date(d.dateLastModified), clientCorporation: d.clientCorporation || undefined }));
                        });
                        if (!testMode) {
                            console.log("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                            const res = yield (0, BullhornCrud_1.saveLeads)(updatedData);
                            if (res === -1)
                                return;
                        }
                        offset += count;
                        repeatErr = 0;
                        if (total <= offset)
                            break;
                    }
                    else if (res.status === 404) {
                        return [];
                    }
                    else {
                        console.log(url);
                        throw "error";
                    }
                }
                catch (error) {
                    console.log(error.message, "\nrepeatNumber =", repeatErr);
                    yield this.getNewAccessToken();
                    repeatErr++;
                }
            }
        });
    }
    syncUserTppToBullhorn(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n***** Adding user on bullhorn *****");
            try {
                const query = query_string_1.default.stringify({
                    BhRestToken: this.BhRestToken,
                    executeFormTriggers: false,
                    highLevelCallStack: "/content/fast-add/Candidate",
                });
                const data = {
                    description: null,
                    firstName: user.firstname,
                    lastName: user.lastname,
                    email: user.email,
                    name: `${user.firstname} ${user.lastname}`,
                    owner: null,
                    source: "Other",
                    status: "New Lead",
                    address: {
                        countryID: 1,
                        countryName: "United States",
                    },
                    employmentPreference: user.employmentPreference,
                };
                const url = `${this.restUrl}entity/Candidate?${query}`;
                console.log(url);
                const res = yield axios_1.default.put(url, data, {
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Accept: "*/*",
                    },
                });
                return res.data;
            }
            catch (error) {
                console.log(error.message);
                return null;
            }
        });
    }
    getJobPostSubscription(maxEvents = 10) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n***** NewJobOrderSubscription *****");
            try {
                const getQuery = query_string_1.default.stringify({
                    BhRestToken: this.BhRestToken,
                    maxEvents: maxEvents
                });
                const url = `${this.restUrl}event/subscription/jobOrderSubscription?${getQuery}`;
                const { data } = yield axios_1.default.get(url, {
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Accept: "*/*",
                    },
                });
                const newCreatedJobs = (_a = data.events) === null || _a === void 0 ? void 0 : _a.filter((event) => event.entityEventType === 'INSERTED' && event.entityName === 'JobOrder');
                if (newCreatedJobs.length) {
                    this.getJobs(false, 50);
                }
                for (const job of newCreatedJobs) {
                    const jobQuery = query_string_1.default.stringify({
                        BhRestToken: this.BhRestToken,
                        query: `id:${job.entityId}`,
                        fields: `${constant_1.JOB_FIELDS.join(",")},skills`
                    });
                    const jobUrl = `${this.restUrl}search/JobOrder?${jobQuery}`;
                    const { data } = yield axios_1.default.get(jobUrl, {
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                            Accept: "*/*",
                        },
                    });
                    if (data.data.length) {
                        const jobDetail = data.data[0];
                        // Send email based on skills
                        const skills = jobDetail.skills.data;
                        if (skills.length) {
                            const whereQuery = [];
                            skills.forEach((skill) => {
                                whereQuery.push({
                                    skills: {
                                        contains: skill.name,
                                        mode: 'insensitive'
                                    }
                                });
                            });
                            const users = yield db_1.default.user.findMany({
                                where: {
                                    OR: whereQuery
                                },
                                select: {
                                    email: true,
                                }
                            });
                            const emails = users.filter((user) => user.willReceiveNotification).map(user => user.email);
                            yield (0, EmailService_1.sendEmail)(emails, `New job "${jobDetail.title}" posted`, 'new-job-posted', { title: jobDetail.title });
                            console.log('email sent');
                        }
                        // Save new job in DB
                        this.saveJobFunc([jobDetail]);
                    }
                }
            }
            catch (error) {
                console.log(error.message, "\nrepeatNumber =");
                yield this.getNewAccessToken();
            }
        });
    }
}
exports.BullhornService = BullhornService;
BullhornService.client = null;
