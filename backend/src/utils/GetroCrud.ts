import db from "./db";
export const saveCompanies = async (companies: any[]) => {
    const expludeFields = ['organization_careers_pages', 'managers', 'topics'];
    try {
