import db from "./db";
export const saveCompanies = async (companies: any[]) => {
    const expludeFields = ['organization_careers_pages', 'managers', 'topics'];
    try {
        for (const company of companies) {
            try {
							console.log(`Savng company with ID = ${company.id}`);
							const existing = await db.getroCompany.findFirst({
								where: {
									id: company.id,
