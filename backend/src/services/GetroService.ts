import axios from 'axios';
import config from "../config";
import queryString from 'query-string';
import { getCompanies, saveCompanies, saveJobs, saveMembers } from '../utils/GetroCrud';
import { saveBullhornJobs } from '../utils/BullhornCrud';
import { checkForJobFilter, sleep } from '../utils';

    public static client: GetroService | null = null;
    private email = config.getroEmail || '';
