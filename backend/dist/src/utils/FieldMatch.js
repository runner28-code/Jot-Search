"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_FILTER = exports.CompanyFilter = exports.JobFilter = void 0;
exports.JobFilter = {
    bullhorn: {
        jobs_id: "jobs.id",
        title: "title",
        skill: "skillList",
        city: "address_city",
        employmentType: "employmentType",
        onSite: "onSite",
        yearsRequired: "yearsRequired",
        willRelocate: "willRelocate",
        status: "status",
        hidden: "hidden",
        companyId: "clientCorporationID",
    },
    main: {
        id: "id",
        status: "status",
        skillList: "skillList",
        hidden: "hidden",
        employmentType: "employmentType",
        onSite: "onSite",
        yearsRequired: "yearsRequired",
        willRelocate: "willRelocate",
        city: "city",
        state: "state",
        isDeleted: "isDeleted",
        companyId: "companyId",
    },
};
exports.CompanyFilter = {
    bullhorn: {
        name: "name",
        city: "address_city",
        industry: "industryList",
    },
    getro: {
        name: "name",
        city: "locations",
    },
