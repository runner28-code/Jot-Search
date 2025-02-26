import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParam,
import { getCategoriesByFilter } from "../services/Category";
import {
  CategoryByIdResponse,
  CategorySearchByFilterResponse,
