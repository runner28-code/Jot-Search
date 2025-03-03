import { Datasource } from "@prisma/client";

export type Job = {
  id?: string;
  externalId?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country_id?: string;
  employmentType?: string;
