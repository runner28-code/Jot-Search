import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  QueryParam,
  UploadedFile,
  Authorized,
  HeaderParam,
  CurrentUser,
  QueryParams,
} from "routing-controllers";
import { BullhornService } from "../services/BullhornService";
import { sendVerification } from "../services/EmailService";
import {
  register,
  login,
  update,
  recovery,
  getLandingPageStats,
  findUserByEmail,
  getCompanyDashboardStats,
  getCoordinatorDashboardStats,
} from "../services/User";

import { User, USER_TABLE } from "../types/User";

import { COORDINATOR, CANDIDATE, COMPANY, ROLES } from "../utils/constant";
