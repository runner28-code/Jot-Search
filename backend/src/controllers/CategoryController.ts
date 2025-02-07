import {
  Body,
  Get,
  JsonController,
  Post,
} from "routing-controllers";
import { getCategoriesByFilter } from "../services/Category";
import {
