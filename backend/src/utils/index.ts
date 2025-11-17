import { v4 as uuid4 } from 'uuid';
import { Dictionary } from "typed-two-way-map";
import config from '../config';
import { BigQueryService } from "../services/BigQueryService";
import { AdvancedFilterOption, DataSource, Operator } from "../types/Common";
import { CITY_INCLUDE_KEYS_REGEX, JOB_EXCLUDE_KEYS_REGEX } from './constant';

export const isExistByID = async (id: string, datset: string, table: string) => {
    try {
        const query = `
            SELECT * FROM \`${datset}.${table}\`
            WHERE id=${id}
        `;
        const options = {
            query: query,
        };
        const [job] = await BigQueryService.getClient().createQueryJob(options);
        const [res] = await job.getQueryResults();

        if (res && res.length > 0 && `'${res[0].id}'` === id) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return true;
    }
}

export const isExistByCondition = async (condition: string, datset: string, table: string) => {
    try {
        const query = `
            SELECT * FROM \`${datset}.${table}\`
            WHERE ${condition}
        `;
        const options = {
            query: query,
            location: 'US',
        };
        const [job] = await BigQueryService.getClient().createQueryJob(options);
        const [res] = await job.getQueryResults();
        if (res && res.length > 0) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return true;
    }
}

export const consoleLog = (message: any, newLine = true) =>{
    console.log(`${newLine ? '\n' : ''}${message}`);
}

export const sleep = async (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getDataSource = (id: string) => {
    const prefix = id.slice(0, 2);
    if (prefix === 'bl') return DataSource.BULLHORN;
    if (prefix === 'gt') return DataSource.GETRO;
    return DataSource.UNKNOWN;
}

export const genUUID = () => uuid4();

export const checkForJobFilter = (title: string, location: string) => {
    if (title.match(JOB_EXCLUDE_KEYS_REGEX)) return false;
    if (location.replace(/\s+/g, '').match(CITY_INCLUDE_KEYS_REGEX)) return true;
    return false;
}

export const fileUploadOptions = {
    limits: {
        fileSize: config.fileUploadSize,
    }
}

export const justifyData = (data: any, keys: string[], excludeKeys: string[] = []): any => {
    return Object.keys(data).filter(key => keys.indexOf(key) > -1 && excludeKeys.indexOf(key) === -1 ).reduce((v, key) => {
        return {
            ...v,
            [key]: data[key]
        };
    }, {});
}

export const getFilterConditions = (
    filters: AdvancedFilterOption[],
    operator: Operator = "OR",
    specialHandlers: Dictionary<(key: string, value: string) => string> = {},
    nonStringFields: Set<string> = new Set()
  ) => {
    const conditions = filters.map((opt) => {
      if (Array.isArray(opt.value)) {
        const operator = opt.operator || "AND";
        const baseCondition = (value: string) =>
          determineCondition(
            opt.key,
            value,
            specialHandlers,
            nonStringFields
          );
        return opt.value.map(baseCondition).join(` ${operator} `);
      } else {
        return determineCondition(opt.key, opt.value, specialHandlers);
      }
    });
    return conditions.join(` ${operator} `);
  };

export const determineCondition = (
    key: string,
    value: string,
    specialHandlers: Dictionary<(key: string, value: string) => string>,
    nonStringFields: Set<string> = new Set()
