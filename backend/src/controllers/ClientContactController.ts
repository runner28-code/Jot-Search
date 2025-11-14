import {
  Body,
  Get,
  Post,
  QueryParam,
  JsonController,
  Authorized,
} from "routing-controllers";
import { FilterBody } from "../types/Common";

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

      const wheres = normalizeFilters(filters)

      // TODO: assuming filters and fields format
      const clientContacts = await db.clientContact.findMany({
        where: wheres,
        take: count || 100,
        skip: (count || 0) * (page || 0),
      });

      clientContacts?.forEach((clientContact) => clearPassword(clientContact));

      return {
        clientContacts: clientContacts || [],
      };
    } catch (error) {
