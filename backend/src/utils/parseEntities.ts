import { Candidate as BhCandidate, Job as BhJob } from "../types/Bullhorn";
import { User as GtCandidate, Job as GtJob } from "../types/Getro";
import { Job } from "../types/Main";
import { User } from "../types/User";

export const parseBullhornCandidateToUser = (data: BhCandidate) => {
  if (!data.email) return null;

  const user = {
    externalId: data.id,
    firstname: data.firstName,
    lastname: data.lastName,
    gender: data.gender,
    email: data.email,
    role: "candidate",
    address1: data.address_address1,
    address2: data.address_address2,
    city: data.address_city,
    state: data.address_state,
    zip: data.address_zip,
    resume: undefined,
    linkedin: undefined,
    skills: data.primarySkills,
    category: data.specialties,
    seniority: data.experience,
    workspace: data.willRelocate,
    referredBy: data.referredBy,
    roles: data.skillSet,

    description: data.description,
    phone: data.phone || data.workPhone || data.mobile,
    status: data.status,
    username: data.username,

    companyName: data.companyName,
    companyURL: data.companyURL,
    revenue: data.salary,
    dateFounded: data.dateAdded,

    employeeType: data.employeeType,
    experience: data.experience,
    hourlyRate: data.hourlyRate,
    willRelocate: data.willRelocate,
    ethnicity: data.ethnicity,
    workAuthorized: data.workAuthorized,
    disability: data.disability,
  };
  return user;
};

export const parseBullhornCompanyToUser = (data: BhCandidate) => {
  if (!data.email) return null;

  const user: User = {
    externalId: data.id,
    email: data.email,
    role: "candidate",
    address1: data.address_address1,
    address2: data.address_address2,
    city: data.address_city,
    state: data.address_state,
    zip: data.address_zip,
    resume: undefined,
    linkedin: undefined,
    skills: data.primarySkills,
    category: data.specialties,
    seniority: data.experience,
    workspace: data.willRelocate,
    referredBy: data.referredBy,
    roles: data.skillSet,

    phone: data.phone || data.workPhone || data.mobile,
    status: data.status,
    username: data.username,

    companyName: data.companyName,
    companyURL: data.companyURL,
    revenue: data.salary,
    dateFounded: data.dateAdded,

    employeeType: data.employeeType,
    experience: data.experience,
    hourlyRate: data.hourlyRate,
    willRelocate: data.willRelocate,
    ethnicity: data.ethnicity,
    workAuthorized: data.workAuthorized,
    disability: data.disability,
  };
