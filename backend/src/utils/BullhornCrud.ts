import { User } from "../types/User";
import { BigQueryService } from "../services/BigQueryService";
import { DATASET_BULLHORN, DATASET_MAIN, Tables } from "../types/Common";
import { genUUID, isExistByCondition, isExistByID } from "./";
import { Candidate } from "../types/Bullhorn";
import { Job } from "../types/Main";
import {
  parseBullhornCandidateToUser,
  parseBullhornJobToMain,
} from "./parseEntities";
import db from "./db";
import { Candidate as DbCandidate } from "prisma/prisma-client";

export const saveCompanies = async (companies: any[]) => {
  // Update existing database to remove https and unneccessary route path.
  // Keep it for now.
  // const result = await db.company.findMany({
  //   where: {
  //     companyURL: {
  //       not: null
  //     }
  //   }
  // });
  // for (const item of result) {
  //   await db.company.update({
  //     where: {
  //       id: item.id,
  //     },
  //     data: {
  //       companyURL: item.companyURL ? item.companyURL.replace(/^http:\/\/|https:\/\//, '').split('/')[0].replace(/^www\./, '') : null
  //     }
  //   })
  // }
  // return { result: false };

