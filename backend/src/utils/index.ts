import { v4 as uuid4 } from 'uuid';
import { Dictionary } from "typed-two-way-map";
import config from '../config';
import { BigQueryService } from "../services/BigQueryService";
import { AdvancedFilterOption, DataSource, Operator } from "../types/Common";
import { CITY_INCLUDE_KEYS_REGEX, JOB_EXCLUDE_KEYS_REGEX } from './constant';

export const isExistByID = async (id: string, datset: string, table: string) => {
    try {
            SELECT * FROM \`${datset}.${table}\`
            WHERE id=${id}
        `;
        const options = {
            query: query,
            location: 'US',
        };
        const [job] = await BigQueryService.getClient().createQueryJob(options);
        const [res] = await job.getQueryResults();

        if (res && res.length > 0 && `'${res[0].id}'` === id) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
