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

