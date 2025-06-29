import { Operator } from "../types/Common";
import db from "../utils/db";

export const getCategoriesByFilter = async (
  filters: any,
  fields?: any,
  operator: Operator = "OR"
) => {
