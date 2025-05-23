import {
  Body,
  Get,
  Post,
  QueryParam,
  JsonController,
  Authorized,
} from "routing-controllers";
import { FilterBody } from "../types/Common";

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

