export type Company = {
  id: string;
  angellist_url?: string;
  approx_employees?: string;
  crunchbase_url?: string;
  description?: string;
  domain?: string;
  facebook_url?: string;
  founded?: string;
  instagram_url?: string;
  jobs_count?: string;
  linkedin_url?: string;
  logo_url?: string;
  name?: string;
  ocp_search_status?: string;
  scraping_enabled?: string;
  slug?: string;
  status?: string;
  topics?: string;
  twitter_url?: string;
  url?: string;
  website_url?: string;
  managers?: string;
  network_id?: string;
  locations?: string;
  collections?: string;
};

export type Job = {
  id: string;
  application_method?: string;
  application_path?: string;
  compensation_currency?: string;
  compensation_max?: string;
  compensation_period?: string;
  compensation_public?: string;
  description?: string;
  discarded?: string;
  employment_types?: string;
  expires_at?: string;
  job_functions?: string;
  locations?: string;
  organization_id?: string;
  passes_filter?: string;
  posted_at?: string;
  slug?: string;
  source?: string;
  status?: string;
  title?: string;
  url?: string;
  hidden?: boolean;
};

export const ALLOWED_GETRO_FILTERS = new Set<keyof Job>([
