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
