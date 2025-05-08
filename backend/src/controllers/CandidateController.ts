import {
  Body,
  Get,
  Post,
  Put,
  QueryParam,
  JsonController,
  Authorized,
  CurrentUser,
  Patch,
} from "routing-controllers";
import { saveCandidate, getSavedCandidates } from "../services/Candidate";
import { FilterBody } from "../types/Common";
import { User } from "../types/User";
import { COMPANY } from "../utils/constant";

import db from "../utils/db";

import { JobFilter, USER_FILTER } from "../utils/FieldMatch";
import { getSavedJobs, saveJob } from "../utils/MainCrud";
import { clearPassword } from "../utils/password";
import { COORDINATOR } from "../utils/constant";
import { sendEmail, sendJobsToCandidates } from "../services/EmailService";
import { getJobsList } from "../services/Job";
import { normalizeFilters } from "./JobController";
import { Dictionary } from "typed-two-way-map";
import e from "express";

@JsonController("/api/candidate")
export class CandidateController {
  @Authorized()
  @Get("/savedJobs")
  async savedJobs(@QueryParam("candidate") candidate: string) {
    return await getSavedJobs(candidate);
  }

  @Authorized()
  @Get("/search")
  async searchById(@QueryParam("id") id: string) {
    try {
      const user = await db.user.findFirst({
        where: {
          id,
        },
        include: {
          candidate: true,
        },
      });

      let candidate;
      if (user) {
        const {
          password,
          candidate: userCandidate,
          ...returnableUserData
        } = user;
        candidate = {
          ...(userCandidate || {}),
          ...returnableUserData,
        };
      } else {
        candidate = await db.candidate.findFirst({
          where: {
            id,
          },
        });
      }

      return {
        candidate: clearPassword(candidate),
        message: !candidate ? "No user with given ID" : undefined,
      };
    } catch (error) {
      return { message: error };
    }
  }

  @Authorized()
  @Post("/update")
  async update(
    @CurrentUser() authUser: User,
    @Body() body: any
  ) {
    try {
      console.log({ body });
      const { id, ...data } = body;

      if (authUser.role !== COORDINATOR) {
        return { message: "You are not authorized to update candidate", result: false };
      }

      const candidate = await db.candidate.findFirst({
        where: {
          id,
        },
      });

      if (!candidate) {
        return { message: "No candidate with given ID", result: false };
      }

      const updatedUser = await db.candidate.update({
        where: {
          id,
        },
        data,
      });

      clearPassword(updatedUser);

      return { message: "Candidate updated successfully", data: updatedUser, result: true };
    } catch (error) {
      console.error(error)
      return { message: error, result: false };
    }
  }

  @Authorized()
  @Post("/search")
  async searchByFilters(@Body() body: FilterBody) {
    try {
      const { page, count, filters, fields } = body;

      const skip = (count || 0) * ((page - 1) || 0)

      let where = normalizeFilters(filters);

      const translateTppFilters: any = {
        "remote availability": "workspace",
        "activelyLooking": "activelyLooking",
        "employmentPreference": "employmentPreference",
      }

      const tppSpecificFilterKeys = Object.keys(translateTppFilters)

      const bothTypesOfUserFilters = ["categoryId", "status", 'experience', 'firstName']

      const canBeBothTypesOfUserFilters = Object.keys(where).every(key => bothTypesOfUserFilters.includes(key))

      let candidatesPromise, totalPromise;
      let isTppUserQuery = Object.keys(where).some(key => tppSpecificFilterKeys.includes(key));


      where = Object.keys(where).reduce((acc, key) => {
        if (tppSpecificFilterKeys.includes(key)) {
          acc[translateTppFilters[key]] = where[key];
        } else {
          acc[key] = where[key];
        }
        return acc;
      }, {} as Dictionary<string>);

      if (!isTppUserQuery && fields) {
        const _fields: Dictionary<boolean> = {}
        _fields['email'] = true;
        fields.forEach((field: string) => {
          _fields[field] = true
        })
        const candidateOnlyPromise = db.candidate.findMany({
          where,
          skip: skip < 0 ? 0 : skip,
          take: count,
          select: {
            id: true,
            ..._fields
          },
          orderBy: {
            firstName: "asc",
          }
        });
        const tppUserPromise = db.user.findMany({
          where,
