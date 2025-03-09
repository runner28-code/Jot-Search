import axios from "axios";
import config from "../config";
import queryString from "query-string";
import {
  saveCandidates,
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
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.BhRestToken = BhRestToken;
        this.restUrl = restUrl;
        if (
          this.auth_code &&
          this.access_token &&
          this.refresh_token &&
          this.BhRestToken &&
          this.restUrl
        )
          return true;
      }
    }
    if (await this.getAuthCode()) {
      if (await this.getAccessToken()) return await this.login();
    }
    return false;
  }

  async getCookie() {
    const targetFile = __dirname + "/../config/cookie.json";
    return new Promise((resolve) => {
      fs.readFile(targetFile, async function (err, data) {
        if (err) {
          return resolve(null);
        }
        let cookies = JSON.parse(data.toString());
        return resolve(cookies);
      });
    });
  }

  async setCookie(data: any) {
    const targetFile = __dirname + "/../config/cookie.json";
    return new Promise((resolve, reject) => {
      // Try saving the file.
      fs.writeFile(targetFile, JSON.stringify(data), { flag: "w+" }, (err) => {
        if (err) reject(err);
        else {
          resolve(targetFile);
        }
      });
    });
  }

  async getAuthCode(): Promise<boolean> {
    console.log("\n***** getAuthCode *****");
    const query = queryString.stringify(
      {
        client_id: config.bullhornClientID,
        response_type: "code",
        action: "Login",
        username: config.bullhornApiUsername,
        password: config.bullhornApiPassword,
      },
      { encode: false }
    );
    const url = `${this.oauth_url}/authorize?${query}`;
    console.log("url =", url);
    const res = await axios.get(url);
    if (res.status === 200) {
      const path = res.request.path;
      console.log("path =", path);
      this.auth_code = path
        .slice(7, path.indexOf("&client"))
        .replace("%25", "%");
      console.log("Auth Code: ", this.auth_code);
      return true;
    }
    return false;
  }

  async getAccessToken(): Promise<boolean> {
    console.log("\n***** getAccessToken *****");
    const query = queryString.stringify(
      {
        grant_type: "authorization_code",
        client_id: config.bullhornClientID,
        client_secret: config.bullhornClientSecret,
        code: this.auth_code,
      },
      { encode: false }
    );
    const url = `${this.oauth_url}/token?${query}`;
    console.log(url);
    const res = await axios.post(url);
    console.log(res.status);
    console.log(res);
    console.log("============================ \n");
    if (res.status === 200) {
      const { access_token, refresh_token } = res.data;
      this.access_token = access_token;
      this.refresh_token = refresh_token;
      console.log("Access Token: ", this.access_token);
      console.log("Refresh Token: ", this.refresh_token);
      return true;
    }
    return await this.getNewAccessToken();
  }

  async getNewAccessToken(): Promise<boolean> {
    console.log("\n***** getNewAccessToken *****");
    try {
      const query = queryString.stringify(
        {
          grant_type: "refresh_token",
          client_id: config.bullhornClientID,
          client_secret: config.bullhornClientSecret,
          refresh_token: this.refresh_token,
        },
        { encode: false }
      );
      const url = `${this.oauth_url}/token?${query}`;
      console.log("access token url: ", url);
      const res = await axios.post(url);
      console.log(res.status);
      if (res.status === 200) {
        const { access_token, refresh_token } = res.data;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        return await this.login();
      }
      return await this.init();
    } catch (error: any) {
      console.log("Error on getNewAccessToken", error.message);
      return await this.init();
    }
  }

  async login(): Promise<boolean> {
    console.log("\n***** login *****");
    let retryNo = 0;
    while (retryNo < 3) {
      try {
        const query = queryString.stringify(
          {
            version: "*",
            access_token: this.access_token,
          },
          { encode: false }
        );
        const url = `${this.api_base_url}/login?${query}`;
        const res = await axios.post(url);
        if (res.status === 200) {
          const { BhRestToken, restUrl } = res.data;
          this.BhRestToken = BhRestToken;
          this.restUrl = restUrl;
          this.corpToken = restUrl.split("/")[4];
          console.log("BhRestToken: ", this.BhRestToken);
          console.log("restUrl: ", this.restUrl);
          console.log("corpToken: ", this.corpToken);

          await this.setCookie({
            auth_code: this.auth_code,
            access_token: this.access_token,
            refresh_token: this.refresh_token,
            BhRestToken: this.BhRestToken,
            restUrl: this.restUrl,
          });
          return true;
        } else if (res.status === 400) {
          await this.getNewAccessToken();
        }
      } catch (error: any) {
        console.log(error.message);
        await sleep(1000);
        retryNo++;
        console.log("\nxxxxx login failed: retrying now");
      }
    }
    return false;
  }

  async getCompanies(
    testMode = false,
    count = 50,
    sort = "-dateAdded"
  ): Promise<any> {
    console.log("\n***** getAllCompanies *****");
    let offset = 0;
    let total = 100000;
    let repeatErr = 0;

