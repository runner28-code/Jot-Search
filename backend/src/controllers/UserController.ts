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
  findUserByEmail,
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
      };
    }
    return { result, error };
  }

  /**
   * No-auth route for register page
   * @param user 
   * @returns 
   */
  @Post("/register")
  async register(@Body() user: User) {
    let data = { ...user };

    if (user.role === CANDIDATE) {
      try {
        const res = await (
          await BullhornService.getClient()
        ).syncUserTppToBullhorn(user);
        if (res && res.changedEntityId) {
          console.log("changedEntityId", res.changedEntityId);
          data = { ...data, externalId: res.changedEntityId };
        }
      } catch (error) {
        console.error("error syncing to BH");
        console.error(error);
      }
      const { result, error } = await register(data);
      return {
        result,
        error,
      };
    } else {
      return {
        result: false,
        error: `Invalid user type specified for candidate-only register route: ${user.role}`,
      }
    }
  }

  /**
   * Coordinator-only route to add users depending on type
   * @param authUser 
   * @param user 
   * @returns 
   */
  @Authorized()
  @Post("/add-user")
  async addUser(@CurrentUser() authUser: User, @Body() user: User) {
    let data = { ...user };
    if (authUser.role !== COORDINATOR) {
      return {
        result: false,
        error: "Only coordinators can add other users",
      };
    }
    
    const validRoles = [COORDINATOR, CANDIDATE, COMPANY]; 
    if (!validRoles.includes(user.role)) {
      return {
        result: false,
        error: `Invalid role specified: ${user.role}`,
      };
    }

    if (user.role === COORDINATOR) {
      const { result, error } = await register(data);
      return {
        result,
        error,
      };
    }
    try {
      if (user.role === COMPANY)
        await sendVerification(user.email, user.companyName || "");
      else await sendVerification(user.email, user.firstname || "");
    } catch (error) {
      return {
        result: false,
        error: "Please check email, email maybe invalid one",
      };
    }

    if (user.role === CANDIDATE) {
      try {
        const res = await (
          await BullhornService.getClient()
        ).syncUserTppToBullhorn(user);
        if (res && res.changedEntityId) {
          console.log("changedEntityId", res.changedEntityId);
          data = { ...data, externalId: res.changedEntityId };
        }
      } catch (error) {
        console.error("error syncing to BH");
        console.error(error);
      }
      const { result, error } = await register(data);
      return {
        result,
        error,
