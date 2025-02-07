import { v4 as uuid4 } from 'uuid';
import { Dictionary } from "typed-two-way-map";
import config from '../config';
import { BigQueryService } from "../services/BigQueryService";
import { AdvancedFilterOption, DataSource, Operator } from "../types/Common";

export const isExistByID = async (id: string, datset: string, table: string) => {
    try {
        const query = `
            SELECT * FROM \`${datset}.${table}\`
            WHERE id=${id}
        `;
        const options = {
            query: query,
            location: 'US',
