import moment from "moment";
import { User, USERKEYS, USER_TABLE } from "../types/User";
import { BigQueryService } from "./BigQueryService";
import { DATASET_BULLHORN, DATASET_MAIN, Tables } from "../types/Common";
import { genUUID, isExistByCondition, justifyData } from "../utils";
import config from '../config';
