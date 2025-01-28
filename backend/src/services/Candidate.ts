import db from "../utils/db";

export const saveCandidate = async (
  companyUserId: string
) => {
  try {
    const existing = await db.user.findFirst({
      where: {
        AND: {
