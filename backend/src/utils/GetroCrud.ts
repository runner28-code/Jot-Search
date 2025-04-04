import db from "./db";

export const saveCompanies = async (companies: any[]) => {
    const expludeFields = ['organization_careers_pages', 'managers', 'topics'];
    try {
        for (const company of companies) {
            try {
							const existing = await db.getroCompany.findFirst({
								where: {
									id: company.id,
								},
							});
							if (existing) {
								console.log(`Company with ID: ${company.id} exists`);
								return -1;
							}
			
							const companyData = { ...company };
			
							Object.keys(companyData).forEach((key) => {
								if (expludeFields.includes(key)) {
									delete companyData[key];
								}
							});
			
							const newCompany = await db.getroCompany.create({
								data: companyData,
							});
			
							console.log(`Saved company with ID = ${company.id} successfully`);
            } catch (error) {
                console.log(error);
                console.log(`ERROR: while saving company with ID = ${company.id}`);
            }
        };

