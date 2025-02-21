import { BigQuery } from '@google-cloud/bigquery';
import { config } from 'dotenv';
import { Tables } from '../types/Common';
import { consoleLog } from '../utils';

export class BigQueryService {
    public static client: BigQuery | null = null;

    public static getClient() {
        if (BigQueryService.client === null) {
            BigQueryService.client = new BigQuery();
