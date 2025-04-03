import db from "../utils/db";

export const saveCompany = async (company: string, candidate: string) => {
  try {
    console.log({ company, candidate });
    const existing = await db.user.findFirst({
      where: {
        id: candidate,
        savedCompanies: {
          some: {
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
