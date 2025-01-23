import db from "./db";

  try {
    console.log("applying");
    console.log({ job, candidate });
    const existing = await db.application.findFirst({
      where: {
        jobId: job,
        userId: candidate,
      },
    });
    if (!existing) {
