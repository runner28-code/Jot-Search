import { Datasource } from "@prisma/client";

export type Job = {
  id?: string;
  externalId?: string;
  description?: string;
  address1?: string;
  address2?: string;
  state?: string;
  zip?: string;
  country_id?: string;
  employmentType?: string;
  title?: string;
  willRelocate?: string;
  yearsRequired?: string;
  status?: string;
  skillList?: string;
  locations?: string;
  companyId?: string;
  interviews?: string;
  onSite?: string;
  salary?: string;
  salaryUnit?: string;
  startDate?: string;
  type?: string;
  isDeleted?: string;
  postedAt?: string;
