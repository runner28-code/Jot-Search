import { BigQuery } from '@google-cloud/bigquery';
import { config } from 'dotenv';
import { Tables } from '../types/Common';
import { User } from '../types/User';
import { consoleLog } from '../utils';

export class BigQueryService {
