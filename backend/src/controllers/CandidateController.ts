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
          skip: skip < 0 ? 0 : skip,
          take: count,
          orderBy: {
            firstname: "asc",
          }
        });
        candidatesPromise = Promise.all([tppUserPromise, candidateOnlyPromise]).then(([tppUsers, candidates]) => {
          // combine the two arrays
          const typedUsers = tppUsers.map((user: any) => ({
            ...user,
            type: "user"
          }))

          const typedCandidates = candidates.map((candidate: any) => ({
            ...candidate,
            type: "candidate"
          }))

          return [...typedUsers, ...typedCandidates]
        })
      } else if (canBeBothTypesOfUserFilters) {
        const { status, firstName, ...whereWithoutStatus } = where
        whereWithoutStatus.candidateId = undefined;
        if (firstName) {
          whereWithoutStatus.firstname = firstName
        }
        const categoryId = where.categoryId;
        if (categoryId) {
          // change categoryId to category external id because in candidate table it is saved as externalID.
          const category = await db.category.findFirst({
              id: categoryId
            }
          })
          where.categoryId = category?.externalID;
        }
        const tppUserPromise = db.user.findMany({
          where: whereWithoutStatus,
          skip: skip < 0 ? 0 : skip,
          take: count || 100,
          orderBy: {
            firstname: "asc",
          },
        });
        const candidateOnlyPromise = candidatesPromise = db.candidate.findMany({
          take: count || 100,
          skip: skip < 0 ? 0 : skip,
          include: {
            category: true,
          },
          where,
          orderBy: {
            firstName: "asc",
          }
        });

        candidatesPromise = Promise.all([tppUserPromise, candidateOnlyPromise]).then(([tppUsers, candidates]) => {
          // combine the two arrays
          const typedUsers = tppUsers.map((user: any) => ({
            ...user,
            type: "user"
          }))

          const typedCandidates = candidates.map((candidate: any) => ({
            ...candidate,
            type: "candidate"
          }))

          console.log({ typedUsers, typedCandidates })
          return [...typedUsers, ...typedCandidates];
        })

        totalPromise = Promise.all([db.user.count({ where: whereWithoutStatus }), db.candidate.count({ where })]).then(([tppUsers, candidates]) => tppUsers + candidates)
      } else if (isTppUserQuery) {
        delete where.status
        delete where.firstName
        candidatesPromise = db.user.findMany({
          where,
          skip: skip < 0 ? 0 : skip,
          take: count || 100,
          orderBy: {
            firstname: "asc",
          },
          include: {
            candidate: true,
          },
        });

        totalPromise = db.user.count({ where })
      } else {
        candidatesPromise = db.candidate.findMany({
          take: count || 100,
          skip: skip < 0 ? 0 : skip,
          include: {
            category: true,
          },
          where,
          orderBy: {
            firstName: "asc",
          }
        });

        totalPromise = db.candidate.count({ where })
      }

      const [candidates, total] = await Promise.all([candidatesPromise, totalPromise]);

      candidates.forEach((candidate) => clearPassword(candidate));

      const emails = candidates.map((candidate: any) => candidate.email);

      let extendedCandidates;
      if (isTppUserQuery) {
        extendedCandidates = candidates.map(candidate => ({
          ...candidate,
          firstName: candidate.firstname,
          lastName: candidate.lastname,
        }))
      } else {
        const users = await db.user.findMany({
          where: {
            email: {
              in: emails.filter((email) => email),
            }
          }
        });
        extendedCandidates = candidates.map((candidate: any) => {
          const user = users.find(user => user.email === candidate.email);
          if (user) {
            candidate.user = user;
            candidate.firstName = user.firstname;
            candidate.lastName = user.lastname;
            delete candidate.user.password;
          }
          return candidate;
        });
      }

      const sortedCandidates = extendedCandidates.sort((a, b) => {
        const aFirstName = a.firstname || a.firstName;
        const bFirstName = b.firstname || b.firstName;
        if (aFirstName === bFirstName) { // if first names are the same, sort by last name
          const aLastName = a.lastname || a.lastName;
          const bLastName = b.lastname || b.lastName;
          return aLastName.localeCompare(bLastName);
        }
        return aFirstName.localeCompare(bFirstName);
      })

      return {
        candidates: sortedCandidates,
        total,
      };
    } catch (error) {
      console.log(error);
      return { message: error };
    }
  }

  @Authorized()
  @Put("/save")
  async save(
    @Body() body: { candidate: string; company: string },
    @CurrentUser() authUser: User
  ) {
    if (authUser.role === COMPANY) {
      return await saveCandidate(body.candidate, body.company || authUser.id!);
    } else {
      return {
        result: false,
        message: "You are not a company",
      };
    }
  }

  @Authorized()
  @Get("/saved")
  async savedCandidates(
    @CurrentUser() authUser: User,
    @QueryParam("candidate") candidate: string
  ) {
    return await getSavedCandidates(candidate || authUser.id!);
  }

  @Authorized()
  @Post("/sendJobs")
  async sendJobs(
    @CurrentUser() authUser: User,
    @Body() body: { jobIds: string[]; candidateIds: string[] }
  ): Promise<any> {
    if (authUser.role !== COORDINATOR) {
      return {
        result: false,
        error: "You should be a coordinator for sending jobs to candidates",
      };
    }
    try {
      const jobsPromise = getJobsList(body.jobIds);
      const candidatesPromise = db.candidate.findMany({
        where: {
          id: {
            in: body.candidateIds,
          },
        },
      });

      const [jobs, candidates] = await Promise.all([
        jobsPromise,
        candidatesPromise,
      ]);

      const candidatesWithEmail = candidates.filter(
        (candidate) => candidate.email
      );

      let result;
      let sentTo;
      if (process.env.SEND_EMAILS_TO_CANDIDATES === "true") {
        const candidateEmails = candidatesWithEmail.map((candidate) => candidate.email!);
        sentTo = candidateEmails;
        result = await sendJobsToCandidates(jobs, candidateEmails);
      } else {
        console.log("Sending emails to candidates is disabled");
        console.log({ candidatesWithEmail });
        if (!process.env.TEST_SEND_EMAILS_TO) {
          result = true
        } else {
          const testSendTo = process.env.TEST_SEND_EMAILS_TO.split(",")
          sentTo = testSendTo;
          result = await sendJobsToCandidates(jobs, testSendTo);
        }
      }

      const candidateJobInvites = []

      for (const candidate of candidatesWithEmail) {
        for (const jobId of body.jobIds) {
          candidateJobInvites.push({
            candidateId: candidate.id,
            jobId: jobId,
          })
        }
      }

      if (result && candidateJobInvites?.length) {
        await db.candidateJobInvites.createMany({
          data: candidateJobInvites
        })
