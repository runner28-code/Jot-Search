import db from "./db";

export const saveCompanies = async (companies: any[]) => {
    const expludeFields = ['organization_careers_pages', 'managers', 'topics'];
        for (const company of companies) {
