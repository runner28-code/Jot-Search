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
  getStats,
  getLandingPageStats,
  getCompanyDashboardStats,
  getCoordinatorDashboardStats,
} from "../services/User";

import { User, USER_TABLE } from "../types/User";

import { COORDINATOR, CANDIDATE, COMPANY, ROLES } from "../utils/constant";

import { CreateJwtToken, VerifyJwtToken } from "../utils/jwtUtils";
import { User as DbUser } from "prisma/prisma-client";
import db from "../utils/db";

@Controller()
export class UserController {
  @Post("/login")
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const { result, error, ...data } = await login(email, password);

    if (result) {
      const token = CreateJwtToken(data);
      return {
        result,
        token,
      };
    }
