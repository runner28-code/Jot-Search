import axios from 'axios';
import config from "../config";
import queryString from 'query-string';
import { saveBullhornJobs } from '../utils/BullhornCrud';
import { checkForJobFilter, sleep } from '../utils';

export class GetroService {
    public static client: GetroService | null = null;
    private email = config.getroEmail || '';
