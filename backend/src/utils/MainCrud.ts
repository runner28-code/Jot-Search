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
      const app = await db.application.create({
        data: {
          user: {
            connect: {
              id: candidate,
            },
          },
          job: {
            connect: {
              id: job,
            },
          }
        },
      });

      console.log({ app });

      return {
        result: true,
      };
    } else {
      console.log("already applied");
      return {
        result: false,
        message: "already applied",
