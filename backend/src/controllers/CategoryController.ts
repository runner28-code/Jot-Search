import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParam,
} from "routing-controllers";
import {
  CategoryByIdResponse,
  CategorySearchByFilterResponse,
  FilterBody,
} from "../types/Common";

@JsonController("/api/category")
export class CategoryController {
