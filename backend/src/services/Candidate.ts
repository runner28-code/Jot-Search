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
          savedCandidates: {
            connect: {
              id: candidateId,
            },
          },
        },
      });
    } else {
      await db.user.update({
        where: {
          id: companyUserId,
        },
        data: {
          savedCandidates: {
            disconnect: {
              id: candidateId,
            },
          },
        },
      });
    }
    return {
      result: true,
      message: existing ? "unsaved candidate" : "saved candidate",
    };
  } catch (error) {
    console.log(error);
    return { result: false, message: error };
  }
};

export const getSavedCandidates = async (companyUserId: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id: companyUserId,
      },
      include: {
        savedCandidates: {
          include: {
            users: true,
          }
        },
      },
    });

    if (user && user.savedCandidates && user.savedCandidates.length > 0) {
      user.savedCandidates = user.savedCandidates.map(candidate => ({
        ...candidate,
        user: candidate.users?.[0]
        })
      );
    }

    return {
      result: true,
      candidates: user?.savedCandidates,
    };
  } catch (error) {
    console.log(error);
    return { result: false, message: error };
  }
};

export const getCandidatesList = async (candidates_ids: string[]) => {
  try {
    const candidates = await db.user.findMany({
      where: {
        id: {
          in: candidates_ids,
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
