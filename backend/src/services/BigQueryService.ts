import { BigQuery } from '@google-cloud/bigquery';
import { config } from 'dotenv';
import { Tables } from '../types/Common';
import { User } from '../types/User';
import { consoleLog } from '../utils';

export class BigQueryService {
    public static client: BigQuery | null = null;

    public static getClient() {
        if (BigQueryService.client === null) {
            BigQueryService.client = new BigQuery();
        }
        return BigQueryService.client;
    }

    public static async selectQuery(datset: string, table: string, fields: string, count?: number, condition?: string, join?: string, fromAlias?: string) {
        try {
            if(join){
                query += ` ${join}`;
            }
