import { Operator } from "../types/Common";
import db from "../utils/db";

export const getCategoriesByFilter = async (
  filters: any,
  fields?: any,
  count?: number,
  operator: Operator = "OR"
) => {
  // TODO: assumes format for fields and filters
  const categories = await db.category.findMany({
