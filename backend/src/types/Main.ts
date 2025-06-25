export type Application = {
    id: string;
    candidate: string;
    job: string;
    appliedOn: string;
}

export type SavedJob = {
    candidate: string;
    job: string;
}

export type Job = {
    id?: string;
    externalId?: string;
    description?: string;
    address1?: string;
    address2?: string;
    city?: string;
