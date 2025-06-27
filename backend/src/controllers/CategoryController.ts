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
  FilterBody,
} from "../types/Common";

@JsonController("/api/category")
export class CategoryController {
  @Get("/search")
  async searchByID(
    @QueryParam("id") id: string
    try {
      const _filters = [
        {
          key: "id",
          value: id,
        },
      ];

      const category = await getCategoriesByFilter(_filters, undefined, 1);

      return {
        category: category?.[0],
        message: null,
      };
    } catch (error) {
      console.log(error);
