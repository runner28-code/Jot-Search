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

