import db from "../utils/db";
export const saveCandidate = async (
  candidateId: string,
  companyUserId: string
) => {
  try {
    const existing = await db.user.findFirst({
      where: {
        AND: {
          id: companyUserId,
          savedCandidates: {
            some: {
              id: candidateId,
            },
          },
        },
      },
    });

    if (!existing) {
      await db.user.update({
        where: {
          id: companyUserId,
        },
        data: {
