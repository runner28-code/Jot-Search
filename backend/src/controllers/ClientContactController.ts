import {
  Body,
  Get,
  Post,
  QueryParam,
  JsonController,
  Authorized,
} from "routing-controllers";

import db from "../utils/db";
import { clearPassword } from "../utils/password";
