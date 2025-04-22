import {
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
} from "../types/Common";

@JsonController("/api/category")
export class CategoryController {
  @Get("/search")
  async searchByID(
    @QueryParam("id") id: string
  ): Promise<CategoryByIdResponse> {
    try {
      const _filters = [
