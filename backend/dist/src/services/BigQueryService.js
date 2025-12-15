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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigQueryService = void 0;
const bigquery_1 = require("@google-cloud/bigquery");
const utils_1 = require("../utils");
class BigQueryService {
    static getClient() {
        if (BigQueryService.client === null) {
            BigQueryService.client = new bigquery_1.BigQuery();
        }
        return BigQueryService.client;
    }
    static selectQuery(datset, table, fields, count, condition, join, fromAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = `SELECT ${fields} FROM \`${datset}.${table}\` ${fromAlias ? `AS ${fromAlias}` : ''}`;
                if (join) {
                    query += ` ${join}`;
                }
                if (condition) {
                    query = `
                    ${query}
                    WHERE ${condition}
                `;
                }
                if (count) {
                    query = `
                    ${query}
                    LIMIT ${count}
                `;
                }
                const options = {
                    query: query,
                    location: 'US',
                };
                (0, utils_1.consoleLog)(`BIGQUERY: SELECT QUERY = ${query}`);
                const [job] = yield BigQueryService.getClient().createQueryJob(options);
                const [res] = yield job.getQueryResults();
                if (res && res.length > 0) {
                    return res;
                }
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    static insertQuery(dataset, table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, utils_1.consoleLog)(`BIGQUERY: INSERT QUERY = ${JSON.stringify(data)}`);
                const keys = Object.keys(data);
                const values = keys.map(k => `"""${data[k]}"""`);
                const query = `
              INSERT INTO \`${dataset}.${table}\`
              (${keys.join(', ')})
              VALUES (${values.join(', ')})
            `;
                console.log(query);
                const options = {
                    query,
                    location: 'US',
                };
                const [job] = yield BigQueryService.getClient().createQueryJob(options);
                const res = yield job.getQueryResults();
                return { result: true, res, data };
            }
            catch (error) {
                console.log(error);
                return { result: false, message: error };
            }
        });
    }
}
exports.BigQueryService = BigQueryService;
BigQueryService.client = null;
