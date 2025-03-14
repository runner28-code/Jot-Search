import { Datasource } from "@prisma/client";

export type Job = {
  id?: string;
  externalId?: string;
  description?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country_id?: string;
  employmentType?: string;
  title?: string;
  willRelocate?: string;
