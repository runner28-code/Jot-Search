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

  const expludeFields = [
    "address",
    "billingAddress",
    "_score",
    "notes",
    "dateAdded",
    "dateLastModified",
  ];
  try {
    for (const company of companies) {
      try {
        console.log(`Savng company with ID = ${company.id}`, company);
        const address = await db.address.create({
          data: company.address,
        });
        const existing = await db.company.findFirst({
          where: {
            externalID: company.id,
          },
        });
        if (existing) {
          console.log(`Company with ID: ${company.id} exists`);
          return -1;
        }

        const companyData = {
          addressId: address.id,
          ...company
        };

        Object.keys(companyData).forEach((key) => {
          if (expludeFields.includes(key)) {
            delete companyData[key];
          }
        });

        companyData.companyURL = companyData.companyURL ? companyData.companyURL.replace(/^http:\/\/|https:\/\//, '').split('/')[0].replace(/^www\./, '') : null;

        const newCompany = await db.company.create({
          data: companyData,
        });

        console.log(`Saved company with ID = ${company.id} successfully`);
      } catch (error: any) {
        console.log(error.message);
        console.log(`ERROR: while saving company with ID = ${company.id}`);
      }
    }

    return { result: true };
  } catch (error: any) {
    console.log(error.message);
    return { result: false, error };
  }
};

export const saveBullhornJobs = async (jobs: any[]) => {
  const excludeFields = [
    "address",
