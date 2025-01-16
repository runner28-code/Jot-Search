import { Datasource, Prisma, PrismaClient } from "@prisma/client";
import {
  Controller,
  Param,
  Body,
  Post,
  Put,
  Delete,
  QueryParam,
  JsonController,
  Authorized,
  CurrentUser,
  Patch,
} from "routing-controllers";
import { Dictionary } from "typed-two-way-map";
import { BigQueryService } from "../services/BigQueryService";
