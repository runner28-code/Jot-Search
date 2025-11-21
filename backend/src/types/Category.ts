export type Category = {
  id?: string;
  dataAdded?: string;
  description?: string;
  enabled?: boolean;
  name?: string;
  occupation?: string;
  type?: string;
  _score?: number;
};

  "id",
  "dataAdded",
  "description",
  "enabled",
  "name",
  "occupation",
  "type",
  "_score",
]);

export const CATEGORY_NON_STRING_FIELDS = new Set<keyof Category>([
  "id",
  "_score",
