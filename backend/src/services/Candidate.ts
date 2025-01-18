import db from "../utils/db";

export const saveCandidate = async (
  candidateId: string,
) => {
  try {
    const existing = await db.user.findFirst({
