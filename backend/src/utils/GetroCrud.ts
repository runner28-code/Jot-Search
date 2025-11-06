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

        return { result: true };
    } catch (error) {
        console.log(error);
        return { result: false, error };
    }
}

export const saveMembers = async (members: any[]) => {
    const expludeFields = ['user_talent_collection', 'referrals_given', 'referrals_received', 'opportunity_types', 'mentorship'];
    try {
        for (const member of members) {
            try {
                console.log(`Savng Getro Member with ID = ${member.id}`);
                const existing = await db.getroMember.findFirst({
									where: {
										id: member.id,
									},
								});
				
								if (existing) {
									console.log(`Job with ID: ${member.id} exists`);
									return -1;
								}
								const jobData = { ...member };
								Object.keys(jobData).forEach((key) => {
									if (expludeFields.includes(key)) {
										delete jobData[key];
									}
								});
				
								const newJob = await db.getroMember.create({
									data: jobData,
								});
                console.log(`Saved Getro Member with ID = ${member.id} successfully`);
            } catch (error) {
                console.log(error);
                console.log(`ERROR: while saving Member with ID = ${member.id}`);
            }
        };

        return { result: true };
    } catch (error) {
        console.log(error);
        return { result: false, error };
    }
}

export const getCompanies = async () => {
	const jobs = await db.getroCompany.findMany();
  return jobs;
}

export const saveJobs = async (jobs: any[]) => {
    const expludeFields = ['organization', 'employment_types', 'visibility'];
		console.log('----- jobs', jobs);
    try {
        for (const job of jobs) {
            try {
                console.log(`Savng Getro Job with ID = ${job.id}`);
                const existing = await db.getroJobInfo.findFirst({
									where: {
										id: job.id,
									},
								});
				
								if (existing) {
									console.log(`Job with ID: ${job.id} exists`);
									return -1;
								}
								const jobData = { ...job };
								Object.keys(jobData).forEach((key) => {
									if (expludeFields.includes(key)) {
										delete jobData[key];
									}
								});
