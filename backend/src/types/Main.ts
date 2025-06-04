export type Application = {
    candidate: string;
    job: string;
    appliedOn: string;
}

export type SavedJob = {
    id: string;
    candidate: string;
    job: string;
}

export type Job = {
    id?: string;
    externalId?: string;
    description?: string;
    address1?: string;
