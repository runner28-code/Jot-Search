  Body,
  Get,
  JsonController,
  Post,
  QueryParam,
} from "routing-controllers";
import { getCategoriesByFilter } from "../services/Category";
import {
  CategoryByIdResponse,
  CategorySearchByFilterResponse,
