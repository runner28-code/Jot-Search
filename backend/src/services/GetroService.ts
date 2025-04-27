import axios from 'axios';
import config from "../config";
import queryString from 'query-string';
import { getCompanies, saveCompanies, saveJobs, saveMembers } from '../utils/GetroCrud';
import { saveBullhornJobs } from '../utils/BullhornCrud';
import { checkForJobFilter, sleep } from '../utils';

export class GetroService {
    public static client: GetroService | null = null;
    private email = config.getroEmail || '';
    private password = config.getroPassword || '';
    private api_base_url_v1 = 'https://api.getro.com/api/v1';
    private api_base_url_v2 = 'https://api.getro.com/v2';
    private networkId = null;

    public static async getClient() {
        if (GetroService.client === null) {
            GetroService.client = new GetroService();
            await GetroService.client.getNetworkID();
        }
        return GetroService.client;
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
    };

    async checkAuth(): Promise<boolean> {
        if (this.networkId) return true;
        const authRes = await this.getNetworkID();
        if (authRes) return true;
        throw 'Auth failed';
    }
    async getNetworkID(): Promise<boolean> {
        try {
            console.log('\n***** getNetworkID *****');
            const url = `${this.api_base_url_v2}/networks`;

            const res = await axios.get(url, this.getOptions());
            await sleep(2000); // https://developers.getro.com/#rate-limit

            if (res.status === 200) {
                const { items } = res.data;
                if (items.length > 0) {
                    this.networkId = items[0].id;
                } else {
                    return false;
                }
                console.log('Network ID: ', this.networkId);
                return true;
            }
        } catch (error) {
            console.log(error);
        }
        return false;
    };

    async getCompanies(testMode = false, per_page = 30): Promise<any> {
        console.log('\n***** getCompanies *****');
        let page = 1;
        let repeatErr = 0;

        while (repeatErr < 3) {
            try {
                await this.checkAuth();
                const query = queryString.stringify({
                    per_page,
                    page,
                    detailed: true
                });
                const url = `${this.api_base_url_v1}/collections/${this.networkId}/organizations?${query}`;

                const res = await axios.get(url, this.getOptions());
                await sleep(2000); // https://developers.getro.com/#rate-limit

                if (res.status === 200) {
                    const { items, meta: { total: total } } = res.data;
                    if (!testMode) {
                        let result = [];
                        for (const company of items) {
                            const detail = await this.getCompanyDetail(company.slug);
                            if (detail) {
                                result.push(detail);
                            }
                            if (result.length > 29) {
                                await saveCompanies(result);
                                result = [];
                            }
                        }
                        await saveCompanies(result);
                    }
                    console.log(`${total} / ${(page - 1) * per_page + items.length}`);
                    page++;
                    repeatErr = 0;
                    if (items.length < per_page) break;
                }
            } catch (error) {
                console.log(error);
                repeatErr++;
            }
