import {
  Body,
  JsonController,
  Post,
  QueryParam,
} from "routing-controllers";
import { getCategoriesByFilter } from "../services/Category";
import {
