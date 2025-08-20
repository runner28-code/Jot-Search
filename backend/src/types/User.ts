export type User = {
  id?: string;
  externalId?: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
  email: string;
  password?: string;
  role: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  resume?: string;
  avatar?: string;
  linkedin?: string;
  skills?: string;
  category?: string;
  categoryId?: string | number;
  seniority?: string;
  workspace?: string;
  referredBy?: string;
  roles?: string;

  description?: string;
  phone?: string;
  status?: string;
  username?: string;
  logo?: string;

  companyId?: string;
  companyName?: string;
  annualRevenue?: string;
  companyURL?: string;
  revenue?: string;
  dateFounded?: string;

  employeeType?: string;
  experience?: string;
  hourlyRate?: string;
  willRelocate?: string;
  willReceiveNotification?: boolean;
  ethnicity?: string;
  workAuthorized?: string;
  disability?: string;
  occupation?: string;

  employmentPreference?: string;
};

export const IUSER = {
  id: "",
  externalId: "",
  firstname: "",
  lastname: "",
  gender: "",
  email: "",
  password: "",
  role: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  resume: "",
  avatar: "",
  linkedin: "",
  skills: "",
  category: "",
  seniority: "",
