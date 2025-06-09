import { Dictionary, TypedDictionary } from "typed-two-way-map";

export const JobFilter: any = {
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

export type CompanyFilterKey = "bullhorn" | "getro" | "joined";

export const CompanyFilter: TypedDictionary<
  CompanyFilterKey,
  Dictionary<string>
