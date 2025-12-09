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
exports.GetroService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const query_string_1 = __importDefault(require("query-string"));
const GetroCrud_1 = require("../utils/GetroCrud");
const BullhornCrud_1 = require("../utils/BullhornCrud");
const utils_1 = require("../utils");
class GetroService {
    constructor() {
        this.email = config_1.default.getroEmail || '';
        this.password = config_1.default.getroPassword || '';
        this.api_base_url_v1 = 'https://api.getro.com/api/v1';
        this.api_base_url_v2 = 'https://api.getro.com/v2';
        this.networkId = null;
    }
    static getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            if (GetroService.client === null) {
                GetroService.client = new GetroService();
                yield GetroService.client.getNetworkID();
            }
            return GetroService.client;
        });
    }
    getOptions() {
        return {
            headers: {
                'X-User-Email': this.email,
                'X-User-Token': this.password,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
    }
    ;
    checkAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.networkId)
                return true;
            const authRes = yield this.getNetworkID();
            if (authRes)
                return true;
            throw 'Auth failed';
        });
    }
    getNetworkID() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\n***** getNetworkID *****');
                const url = `${this.api_base_url_v2}/networks`;
                const res = yield axios_1.default.get(url, this.getOptions());
                yield (0, utils_1.sleep)(2000); // https://developers.getro.com/#rate-limit
                if (res.status === 200) {
                    const { items } = res.data;
                    if (items.length > 0) {
                        this.networkId = items[0].id;
                    }
                    else {
                        return false;
                    }
                    console.log('Network ID: ', this.networkId);
                    return true;
                }
            }
            catch (error) {
                console.log(error);
            }
            return false;
        });
    }
    ;
    getCompanies(testMode = false, per_page = 30) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('\n***** getCompanies *****');
            let page = 1;
            let repeatErr = 0;
            while (repeatErr < 3) {
                try {
                    yield this.checkAuth();
                    const query = query_string_1.default.stringify({
                        per_page,
                        page,
                        detailed: true
                    });
                    const url = `${this.api_base_url_v1}/collections/${this.networkId}/organizations?${query}`;
                    const res = yield axios_1.default.get(url, this.getOptions());
                    yield (0, utils_1.sleep)(2000); // https://developers.getro.com/#rate-limit
                    if (res.status === 200) {
                        const { items, meta: { total: total } } = res.data;
                        if (!testMode) {
                            let result = [];
                            for (const company of items) {
                                const detail = yield this.getCompanyDetail(company.slug);
                                if (detail) {
                                    result.push(detail);
                                }
                                if (result.length > 29) {
                                    yield (0, GetroCrud_1.saveCompanies)(result);
                                    result = [];
                                }
                            }
                            yield (0, GetroCrud_1.saveCompanies)(result);
                        }
                        console.log(`${total} / ${(page - 1) * per_page + items.length}`);
                        page++;
                        repeatErr = 0;
                        if (items.length < per_page)
                            break;
                    }
                }
                catch (error) {
                    console.log(error);
                    repeatErr++;
                }
            }
        });
    }
    getCompanyDetail(slug) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`\n***** getCompanyDetail (${slug}) *****`);
            const query = query_string_1.default.stringify({
                collection_id: this.networkId,
                detailed: true
            });
            const url = `${this.api_base_url_v1}/organizations/${slug}?${query}`;
            const res = yield axios_1.default.get(url, this.getOptions());
            yield (0, utils_1.sleep)(2000); // https://developers.getro.com/#rate-limit
            if (res.status === 200) {
                const data = res.data;
                return Object.assign(Object.assign({}, data), { id: `gt-${data.id}`, collections: ((_a = data.collections) === null || _a === void 0 ? void 0 : _a.map((col) => col.id).join(' | ')) || null, locations: ((_b = data.locations) === null || _b === void 0 ? void 0 : _b.map((loc) => loc.name).join(' | ')) || null, network_id: this.networkId });
            }
            return null;
        });
    }
    /**
     * getMemebers
     */
    getMembers(testMode = false, per_page = 30) {
// Temp comment
        return __awaiter(this, void 0, void 0, function* () {
            console.log('\n***** getMembers *****');
            let page = 1;
            let repeatErr = 0;
            while (repeatErr < 3) {
                try {
                    yield this.checkAuth();
                    const query = query_string_1.default.stringify({
                        per_page,
                        page,
                        collection_id: this.networkId,
                        'roles[]': 'none'
                    });
                    const url = `${this.api_base_url_v1}/members?${query}`;
                    const res = yield axios_1.default.get(url, this.getOptions());
                    yield (0, utils_1.sleep)(2000); // https://developers.getro.com/#rate-limit
                    if (res.status === 200) {
                        let result = [];
                        const { items, meta: { total } } = res.data;
                        if (!testMode) {
                            for (const company of items) {
                                const detail = yield this.getMemberDetail(company.id);
                                if (detail) {
                                    result.push(detail);
                                }
                                if (result.length > 30) {
                                    yield (0, GetroCrud_1.saveMembers)(result);
                                    result = [];
                                }
                            }
                            yield (0, GetroCrud_1.saveMembers)(result);
                        }
                        console.log(`${total} / ${(page - 1) * per_page + items.length}`);
                        page++;
                        repeatErr = 0;
                        if (items.length < per_page)
                            break;
                    }
                }
                catch (error) {
                    repeatErr++;
                }
            }
        });
    }
    getMemberDetail(id) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`\n***** getMemberDetail (${id}) *****`);
            const query = query_string_1.default.stringify({
                collection_id: this.networkId,
            });
            const url = `${this.api_base_url_v1}/members/${id}?${query}`;
            const res = yield axios_1.default.get(url, this.getOptions());
            yield (0, utils_1.sleep)(2000); // https://developers.getro.com/#rate-limit
            if (res.status === 200) {
                const data = res.data;
                return Object.assign(Object.assign({}, data), { id: `gt-${data.id}`, talent_groups: ((_a = data.talent_groups) === null || _a === void 0 ? void 0 : _a.map((talent) => talent.id).join(' | ')) || null, skills: ((_b = data.skills) === null || _b === void 0 ? void 0 : _b.map((skill) => skill.name).join(' | ')) || null, locations: ((_c = data.locations) === null || _c === void 0 ? void 0 : _c.map((location) => location.name).join(' | ')) || null, employment_types: ((_d = data.employment_types) === null || _d === void 0 ? void 0 : _d.map((employment_type) => employment_type).join(' | ')) || null, current_location: ((_e = data.current_location) === null || _e === void 0 ? void 0 : _e.name) || null, network_id: this.networkId, joined_at: new Date(data.joined_at) });
            }
            return null;
        });
    }
    getJobs(testMode = false, per_page = 30) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`\n***** getJobs *****`);
            const companies = yield (0, GetroCrud_1.getCompanies)();
            if (companies.length === 0) {
                return {
                    error: 'no company on db'
                };
            }
            try {
                yield this.checkAuth();
                let flag = false;
                for (const company of companies) {
                    // if (company.id === 'gt-23348') flag = true;
                    // console.log(`\n***** fetching jobs for company ${company.id} *****`);
                    // if (!flag) continue;
                    const company_id = company.id.slice(3);
                    let page = 1;
                    let repeatErr = 0;
                    while (repeatErr < 3) {
                        const query = query_string_1.default.stringify({
                            per_page,
                            page,
                            collection_id: this.networkId,
                            'organization_ids[]': company_id,
                            'status[]': 'active'
                        });
                        const url = `${this.api_base_url_v1}/jobs?${query}`;
                        try {
                            const res = yield axios_1.default.get(url, this.getOptions());
                            yield (0, utils_1.sleep)(2000); // https://developers.getro.com/#rate-limit
                            const { items, meta: { total } } = res.data;
                            if (!testMode) {
                                const newItems = items.map((item) => {
                                    var _a, _b, _c, _d, _e, _f, _g;
                                    return (Object.assign(Object.assign({}, item), { id: `gt-${item.id}`, job_functions: (_a = item.job_functions) === null || _a === void 0 ? void 0 : _a.map((jf) => jf.name).join(' | '), locations: (_b = item.locations) === null || _b === void 0 ? void 0 : _b.map((loc) => loc.name).join(' | '), organization_doman: (_c = item.organization) === null || _c === void 0 ? void 0 : _c.domain, organization_id: (_d = item.organization) === null || _d === void 0 ? void 0 : _d.id, organization_logo_url: (_e = item.organization) === null || _e === void 0 ? void 0 : _e.logo_url, organization_name: (_f = item.organization) === null || _f === void 0 ? void 0 : _f.name, organization_slug: (_g = item.organization) === null || _g === void 0 ? void 0 : _g.slug, posted_at: new Date(item.posted_at), expires_at: new Date(item.expires_at), deactivated_at: new Date(item.deactivated_at), closed_at: new Date(item.closed_at) }));
                                });
                                for (const job of newItems) {
                                    if ((0, utils_1.checkForJobFilter)(job.title, job.locations)) {
                                        // await saveJobs([job]);
                                        yield this.saveGetroJobInBullhornJobTable(job);
                                    }
                                    else {
                                        console.log('JOB doesn\'t meet the qualification! Skipping...');
                                    }
                                }
                            }
                            console.log(page);
                            if (per_page === items.length) {
                                console.log(`${total} / ${(page - 1) * per_page + items.length}`);
                                page++;
                                repeatErr = -0;
                            }
                            else {
                                break;
                            }
                        }
                        catch (error) {
                            console.log(error);
                            console.log(url);
                            repeatErr++;
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    saveGetroJobInBullhornJobTable(getroJob) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('---- Getro job: ', getroJob.id);
            const data = {
                externalId: getroJob.id,
                description: getroJob.description,
                onSite: getroJob.locations,
                status: 'Active',
                title: getroJob.title,
                createdAt: getroJob.createdAt,
                updatedAt: getroJob.updatedAt,
            };
            yield (0, BullhornCrud_1.saveBullhornJobs)([data]);
        });
    }
