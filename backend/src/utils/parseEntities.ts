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
