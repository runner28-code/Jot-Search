import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParam,
} from "routing-controllers";
import { getCategoriesByFilter } from "../services/Category";
  CategoryByIdResponse,
  CategorySearchByFilterResponse,
  FilterBody,
} from "../types/Common";
