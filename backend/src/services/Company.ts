import db from "../utils/db";

  try {
    console.log({ company, candidate });
    const existing = await db.user.findFirst({
      where: {
