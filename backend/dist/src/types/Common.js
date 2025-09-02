"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.DataSource = exports.DATASET_MAIN = exports.DATASET_GETRO = exports.DATASET_BULLHORN = exports.Tables = void 0;
const config_1 = __importDefault(require("../config"));
var Tables;
(function (Tables) {
    Tables["COMPANIES"] = "Companies";
    Tables["JOBS"] = "Jobs";
    Tables["USER"] = "User";
    Tables["CONTACTS"] = "Contacts";
    Tables["LEADS"] = "Leads";
    Tables["CANDIDATES"] = "Candidates";
    Tables["APPLICATIONS"] = "Applications";
    Tables["SAVEDJOBS"] = "SavedJobs";
    Tables["SAVED_COMPANIES"] = "SavedCompanies";
    Tables["SAVED_CANDIDATES"] = "SavedCandidates";
    Tables["JOINED_COMPANIES"] = "companies_joined";
    Tables["JOINED_CANDIDATES"] = "candidates_joined";
    Tables["CATEGORIES"] = "Categories";
})(Tables = exports.Tables || (exports.Tables = {}));
