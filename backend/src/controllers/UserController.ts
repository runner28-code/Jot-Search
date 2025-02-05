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
  update,
  recovery,
  getStats,
  getLandingPageStats,
  findUserByEmail,
  getCompanyDashboardStats,
  getCoordinatorDashboardStats,
} from "../services/User";

