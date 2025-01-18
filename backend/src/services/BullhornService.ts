import axios from "axios";
import config from "../config";
import queryString from "query-string";
import {
  saveClientContacts,
  saveCompanies,
  saveBullhornJobs,
  saveLeads,
} from "../utils/BullhornCrud";
import fs from "fs";
import { checkForJobFilter, sleep } from "../utils";
import db from "../utils/db";
import { User } from "../types/User";
import { Job } from "prisma/prisma-client";
import { sendEmail } from "./EmailService";
import { JOB_FIELDS } from "../utils/constant";

export class BullhornService {
  public static client: BullhornService | null = null;
  private auth_code = null;
  private access_token = null;
  private refresh_token = null;
  private BhRestToken = null;
  private restUrl = null;
  private corpToken = null;
  private oauth_url = "https://auth.bullhornstaffing.com/oauth";
  private api_base_url = "https://rest.bullhornstaffing.com/rest-services";

  public static async getClient() {
    if (BullhornService.client === null) {
      BullhornService.client = new BullhornService();
      await BullhornService.client.init(false);
    }
    return BullhornService.client;
  }

  async init(invalid = true): Promise<boolean> {
    if (!invalid) {
      const cookie: any = await this.getCookie();
      if (cookie !== null) {
        const { auth_code, access_token, refresh_token, BhRestToken, restUrl } =
          cookie;
        this.auth_code = auth_code;
