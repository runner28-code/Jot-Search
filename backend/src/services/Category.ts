import { Operator } from "../types/Common";
import db from "../utils/db";

export const getCategoriesByFilter = async (
  filters: any,
  fields?: any,
  count?: number,
  operator: Operator = "OR"
) => {
  const categories = await db.category.findMany({
    where: filters?.length ? filters : undefined,
    take: count,
  });

  return categories as any;
