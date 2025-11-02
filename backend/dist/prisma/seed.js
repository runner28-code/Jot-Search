"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const db_1 = __importDefault(require("../src/utils/db"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Seeding...🌱");
            // Some of these are dependent on each other, so we need to run them in order
            yield seedCandidates();
            yield seedCompanies();
            yield seedCategories();
            yield seedJobs();
            yield seedUsers();
            console.log("Done🎉");
        }
        catch (err) {
            console.error("Error during seed...❌");
            console.error(err);
            throw err;
        }
    });
}
function seedJobs() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.job.createMany({
            data: [
                {
                    title: "Senior Software Engineer",
                    companyId: (_a = (yield db_1.default.company.findFirst())) === null || _a === void 0 ? void 0 : _a.id,
                    address1: "123 Job St",
                    city: "Tulsa",
                    state: "OK",
                    zip: "74008",
                    salary: 160000,
                    employmentType: "fulltime",
                    onSite: "On-Site",
                    description: "Come join our rockstar team for good money and team",
                    datasource: client_1.Datasource.main,
                    categoryId: (yield db_1.default.category.findFirst({
                        where: { name: "Software & Engineering" },
                    })).id,
                },
                {
                    title: "Junior Software Engineer",
                    companyId: (_b = (yield db_1.default.company.findFirst())) === null || _b === void 0 ? void 0 : _b.id,
                    address1: "123 Job St",
                    city: "Tulsa",
                    state: "OK",
                    zip: "74008",
                    salary: 80000,
                    employmentType: "fulltime",
                    onSite: "Hybrid",
                    description: "Come join our rockstar team for good money and learning",
                    datasource: client_1.Datasource.bullhorn,
                    status: "active",
                    categoryId: (yield db_1.default.category.findFirst({
                        where: { name: "Software & Engineering" },
                    })).id,
                },
            ],
        });
    });
}
function seedCandidates() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.candidate.createMany({
            data: [
                {
                    address: "123 Main St",
                    address_address1: "123 Main St",
                    occupation: "Programmer",
                    address_city: "Tulsa",
                    address_state: "OK",
                    address_zip: "74008",
                    description: "Great candidate for everything",
                    companyName: "Eddy's Everything",
                    companyURL: "eddyseverything.com",
                    firstName: "John",
                    lastName: "Smith",
                    phone: "123-456-7891",
                    email: "jsmithers@gmail.com",
                    comments: "He does everything!",
                },
                {
                    address: "124 Main St",
                    address_address1: "124 Main St",
                    occupation: "None",
                    address_city: "Tulsa",
                    address_state: "OK",
                    address_zip: "74008",
                    description: "Ehh...",
                    companyName: "Nowhere",
                    companyURL: "nowhere.com",
                    firstName: "Bob",
                    lastName: "Tester",
                    phone: "987-654-3210",
                    email: "bobtesting@gmail.com",
                    comments: "He does nothing...",
                },
            ],
        });
    });
}
function seedCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.category.createMany({
            data: [
                {
                    name: "Finance",
                    enabled: true,
                    externalID: 2000031,
                },
                {
                    name: "Marketing",
                    enabled: true,
                    externalID: 2000026,
                },
                {
                    name: "Operations",
                    enabled: true,
                    externalID: 2000014,
                },
                {
                    name: "Other",
                    enabled: true,
                    externalID: 2000001,
                },
                {
                    name: "Sales & Biz Dev",
                    enabled: true,
                    externalID: 2000043,
                },
                {
                    name: "Software & Engineering",
                    enabled: true,
                    externalID: 2000101,
                },
            ],
        });
    });
