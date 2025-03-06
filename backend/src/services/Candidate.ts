import db from "../utils/db";

export const saveCandidate = async (
  candidateId: string,
  companyUserId: string
) => {
  try {
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
