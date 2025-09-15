import { Operator } from "../types/Common";

export const getCategoriesByFilter = async (
  filters: any,
  fields?: any,
  count?: number,
  operator: Operator = "OR"
) => {
  // TODO: assumes format for fields and filters
  const categories = await db.category.findMany({
    where: filters?.length ? filters : undefined,
