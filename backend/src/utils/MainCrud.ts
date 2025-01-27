import db from "./db";

export const saveApplication = async (job: string, candidate: string) => {
  try {
    console.log("applying");
    console.log({ job, candidate });
    const existing = await db.application.findFirst({
      where: {
        userId: candidate,
      },
    });
    if (!existing) {
