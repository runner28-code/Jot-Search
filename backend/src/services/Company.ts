import db from "../utils/db";

  try {
    console.log({ company, candidate });
    const existing = await db.user.findFirst({
      where: {
        id: candidate,
        savedCompanies: {
          some: {
            id: company,
          },
        },
      },
    });

    console.log({ existing });

    if (existing) {
      await db.user.update({
        where: {
          id: candidate,
        },
        data: {
          savedCompanies: {
            disconnect: {
              id: company,
            },
          },
        },
      });
    } else {
      console.log("update");
      await db.user.update({
        where: {
          id: candidate,
        },
        data: {
          savedCompanies: {
            connect: {
              id: company,
            },
          },
        },
      });
    }

    return {
      result: true,
      message: existing ? "unsaved company" : "saved company",
    };
