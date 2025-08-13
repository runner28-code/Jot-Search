export type Category = {
  id?: string;
  dataAdded?: string;
  description?: string;
  enabled?: boolean;
  name?: string;
  occupation?: string;
  _score?: number;
};

export const ALLOWED_CATEGORY_FILTER_KEYS = new Set<keyof Category>([
  "id",
  "dataAdded",
  "description",
  "enabled",
  "name",
