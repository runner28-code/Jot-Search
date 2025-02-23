import { Datasource } from "@prisma/client";

export type Job = {
  externalId?: string;
  description?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
