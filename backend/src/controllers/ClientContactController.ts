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
import { normalizeFilters } from "./JobController";

@JsonController("/api/client-contact")
export class ClientContactController {

  @Authorized()
  @Get("/search")
  async searchById(@QueryParam("id") id: string) {
    try {
      const contact = await db.clientContact.findFirst({
        where: {
          id,
        },
      });

      return {
        contact: clearPassword(contact),
        message: !contact ? "No client contact with given ID" : undefined,
      };
    } catch (error) {
      return { message: error };
    }
  }

  // @Authorized()
  @Post("/search")
  async searchByFilters(@Body() body: FilterBody) {
    try {
      const { page, count, filters } = body;

