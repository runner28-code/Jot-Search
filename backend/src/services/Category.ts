import { Operator } from "../types/Common";
import db from "../utils/db";

export const getCategoriesByFilter = async (
  fields?: any,
  count?: number,
  operator: Operator = "OR"
) => {
