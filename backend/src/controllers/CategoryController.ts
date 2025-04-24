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
  @Get("/search")
  async searchByID(
    @QueryParam("id") id: string
  ): Promise<CategoryByIdResponse> {
    try {
      const _filters = [
        {
