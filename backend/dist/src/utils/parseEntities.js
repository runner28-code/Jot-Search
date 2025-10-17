"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGetroJobToMain = exports.parseBullhornJobToMain = exports.parseBullhornCompanyToUser = exports.parseBullhornCandidateToUser = void 0;
const parseBullhornCandidateToUser = (data) => {
    if (!data.email)
        return null;
    const user = {
        externalId: data.id,
        firstname: data.firstName,
        lastname: data.lastName,
        gender: data.gender,
        email: data.email,
        role: "candidate",
        address1: data.address_address1,
        address2: data.address_address2,
        city: data.address_city,
        state: data.address_state,
        zip: data.address_zip,
        resume: undefined,
        linkedin: undefined,
        skills: data.primarySkills,
        category: data.specialties,
        seniority: data.experience,
        workspace: data.willRelocate,
        referredBy: data.referredBy,
        roles: data.skillSet,
        description: data.description,
        phone: data.phone || data.workPhone || data.mobile,
        status: data.status,
        username: data.username,
        companyName: data.companyName,
        companyURL: data.companyURL,
        revenue: data.salary,
        dateFounded: data.dateAdded,
        employeeType: data.employeeType,
        experience: data.experience,
        hourlyRate: data.hourlyRate,
        willRelocate: data.willRelocate,
        ethnicity: data.ethnicity,
        workAuthorized: data.workAuthorized,
        disability: data.disability,
    };
    return user;
};
exports.parseBullhornCandidateToUser = parseBullhornCandidateToUser;
const parseBullhornCompanyToUser = (data) => {
    if (!data.email)
        return null;
    const user = {
        externalId: data.id,
        email: data.email,
        role: "candidate",
        address1: data.address_address1,
        address2: data.address_address2,
        city: data.address_city,
        state: data.address_state,
        zip: data.address_zip,
        resume: undefined,
        linkedin: undefined,
        skills: data.primarySkills,
        category: data.specialties,
        seniority: data.experience,
        workspace: data.willRelocate,
        referredBy: data.referredBy,
        roles: data.skillSet,
        description: data.description,
        phone: data.phone || data.workPhone || data.mobile,
        status: data.status,
        username: data.username,
        companyName: data.companyName,
        companyURL: data.companyURL,
        revenue: data.salary,
        dateFounded: data.dateAdded,
        employeeType: data.employeeType,
        experience: data.experience,
        hourlyRate: data.hourlyRate,
        willRelocate: data.willRelocate,
        ethnicity: data.ethnicity,
        workAuthorized: data.workAuthorized,
        disability: data.disability,
    };
    return user;
};
exports.parseBullhornCompanyToUser = parseBullhornCompanyToUser;
const parseBullhornJobToMain = (data) => {
    const job = {
        externalId: data.id,
        description: data.description,
        address1: data.address_address1,
        address2: data.address_address2,
        city: data.address_city,
        state: data.address_state,
        zip: data.address_zip,
        country_id: data.address_country_id,
        employmentType: data.employmentType,
        title: data.title,
        willRelocate: data.willRelocate,
        yearsRequired: data.yearsRequired,
        status: data.status,
        skillList: data.skillList,
        interviews: data.interviews,
        onSite: data.onSite,
        salary: data.salary,
        salaryUnit: data.salaryUnit,
        startDate: data.startDate,
        type: data.type,
        isDeleted: data.isDeleted,
        postedAt: data.date_added,
    };
    return job;
