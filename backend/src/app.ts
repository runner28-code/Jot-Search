import "reflect-metadata";
import dotenv from "dotenv";
import { Action, useExpressServer } from "routing-controllers";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { NextFunction } from "connect";
import { VerifyJwtToken } from "./utils/jwtUtils";
import { findUserByEmail } from "./services/User";
