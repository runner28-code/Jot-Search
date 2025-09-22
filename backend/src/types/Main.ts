export type Application = {
    id: string;
    candidate: string;
    job: string;
    appliedOn: string;
}

export type SavedJob = {
    id: string;
    candidate: string;
    job: string;

export type Job = {
    id?: string;
    externalId?: string;
    description?: string;
    address1?: string;
    address2?: string;
    city?: string;
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
