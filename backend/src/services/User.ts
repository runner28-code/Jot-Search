import moment from "moment";
import { User, USERKEYS, USER_TABLE } from "../types/User";
import { BigQueryService } from "./BigQueryService";
import { DATASET_BULLHORN, DATASET_MAIN, Tables } from "../types/Common";
import { COORDINATOR, ROLES } from "../utils/constant";
import { genUUID, isExistByCondition, justifyData } from "../utils";
import config from '../config';

import db from "../utils/db";

import { User as dbUser, History as dbHistory } from "prisma/prisma-client";
import {
  encryptPassword,
  checkPassword,
  clearPassword,
} from "../utils/password";
import {
  sendUpdateUserNotification,
  sendNewUserNotification,
  sendResetPassword,
} from "./EmailService";
import { CreateJwtToken } from "../utils/jwtUtils";

const isNullOrEmpty = (value: any) => {
  return !value || (value && !`${value}`.trim());
};

const validateUser = ({
  firstname,
  lastname,
  email,
  password,
  role,
  city = "",
  state = "",
  resume,
  linkedin,
  skills,
  category,
}: User) => {
  try {
    if (isNullOrEmpty(firstname) || isNullOrEmpty(lastname))
      return "firstname and lastname is required";
    if (isNullOrEmpty(email)) return "email is invalid";
    if (ROLES.find((r) => r === role) === null)
      return `role is invalid, it should be one in [${ROLES.join(", ")}]`;
    if (isNullOrEmpty(password)) return "password is required";
    // if (isNullOrEmpty(resume))
    //     return 'resume is required';
    // if (isNullOrEmpty(linkedin))
    //     return 'linkedin is required';
    // if (isNullOrEmpty(skills))
    //     return 'skill is required';
    // if (isNullOrEmpty(category))
    //     return 'category is required';
  } catch (error) {
    return "something is wrong, please check params";
  }
  return false;
};

export const register = async (data: User) => {
  try {
    console.log("registering...");
    const validate = validateUser(data);
    if (validate) {
      console.log("failed validation", validate);
      return { result: false, error: validate };
    }

    const user = justifyData(data, USERKEYS);
    const existing = await isExistUser("email", user.email);

    if (existing) {
      console.log("user exists");
      return {
        result: false,
        error: `User with ${user.email} exists`,
      };
    }

    const savingData = {
      data: {
        ...data,
        password: encryptPassword(user.password),
      } as any,
    }

    await db.user.create(savingData);

    console.log("success");

    if (process.env && process.env.FRONTEND_URL) {
      await sendNewUserNotification(user.email, user.firstname || "");
    }

    return { result: true };
  } catch (error) {
    console.error(error);
    return { result: false, error };
  }
};

export const update = async (parent_id: string, role: string, data: any) => {
  try {
    const user_id = data.id;
    const id = user_id || parent_id;
    if (user_id && role !== COORDINATOR && parent_id !== user_id) {
      return {
        result: false,
        error: "You should be a coordinator for updating this user",
      };
    }

    const user = justifyData(data, USERKEYS, ["email", "id"]);
    if (user && user.role && !ROLES.find((role) => role === user.role)) {
      return {
        result: false,
        error: `Invalid Role (candidate, coordinator, company)`,
      };
    }

    const existing: dbUser | null = await isExistUserFull("id", id);
    if (!existing) {
      return {
        result: false,
        error: `User with id=${id} doesn't exist`,
      };
    }

    if (user.password) {
      user.password = encryptPassword(user.password);
    }

    if (existing.externalId) {
      try {
        // TODO: add bullhorn api update here
      } catch (error) {
        console.error("Could not update user in bullhorn", error);
      }
    }

    const updated = await db.user.update({
      where: {
        id: existing.id,
      },
      data: user,
    });

    try {
      await addUserHistoryEntries({
        updatedUser: user,
        existingUser: existing,
      });
    } catch (err) {
      console.log("could not add user history:", user);
      console.log(err);
    }
    clearPassword(updated);

    if (config.sendgridSecret) {
      await sendUpdateUserNotification(updated.email, updated.firstname);
    }

    return { result: true, data: updated };
  } catch (error) {
    console.error(error);
    return { result: false, error };
  }
};

export const addUserHistoryEntries = async ({
  updatedUser,
  existingUser,
}: {
  updatedUser: Partial<dbUser>;
  existingUser: dbUser;
}) => {
  const batchId = genUUID();

  const historyRecords = Object.keys(updatedUser)
    .filter((key) => {
      const typedKey = key as keyof dbUser;
      const newValue = updatedUser[typedKey];
      const oldValue = existingUser[typedKey];

      return newValue !== oldValue;
    })
    .map((key) => {
      const typedKey = key as keyof dbUser;
      return {
        table: USER_TABLE,
        recordId: existingUser.id,
        column: key,
        oldValue:
          existingUser[typedKey] != null
            ? existingUser[typedKey]?.toString()
            : null,
        newValue:
          updatedUser[typedKey] != null
            ? updatedUser[typedKey]?.toString()
            : null,
        batchId,
      };
    });

  return await db.history.createMany({
    data: historyRecords,
  });
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id,
      },
    });
    return { result: true, data: user };
  } catch (error) {
    return { result: false, error };
  }
};

export const isExistUser = async (field: string, value: string) => {
  try {
    return (await isExistUserFull(field, value)) != null;
  } catch (error) {
    console.log(error);
    return true;
  }
};

export const isExistUserFull = async (field: string, value: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        [field]: value,
      },
    });

    return user || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser && checkPassword(existingUser.password, password)) {
      return {
        result: true,
        ...clearPassword(existingUser),
        companyId: existingUser.companyId,
        user_id: existingUser.id,
      };
