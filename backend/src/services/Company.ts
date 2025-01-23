import db from "../utils/db";

export const saveCompany = async (company: string, candidate: string) => {
    console.log({ company, candidate });
    const existing = await db.user.findFirst({
