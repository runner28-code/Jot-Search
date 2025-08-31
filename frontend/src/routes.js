/* INTERNAL ROUTES */
export const root = '/';
export const landingPage = '/landing-page';
export const blog = '/blog';
export const about = '/about';
export const login = '/login';
export const logout = '/logout';
export const profile = '/profile';
export const apply = '/apply';
export const favorites = '/favorites';
// Temp comment
export const signup = '/signup';
export const settings = '/settings';
export const accountRecovery = '/account-recovery';
export const resetPassword = '/reset-password';

// Dashboard routes
export const dashboard = '/';
export const careers = '/careers';
export const companies = '/companies';
// Candidate Dashboard
export const applications = '/applications';
export const invitationsToApply = '/invitations-to-apply';
export const savedCareers = '/saved-careers';
export const savedCompanies = '/saved-companies';
// Company Dashboard
export const candidates = '/candidates';
export const savedCandidates = '/saved-candidates';
export const activeCareers = '/active-careers';
export const companyQuickStats = '/company-stats';
// Coordinator Dashboard
export const addUser = '/add-user';
export const alerts = '/alerts';

export const careerSeekers = '/career-seeker';
export const softwareEngineering = '/software-engineering';
export const salesBizDev = '/sales-business-development';
export const operations = '/operations';
export const coordinatorQuickStats = '/coordinator-stats';

/* EXTERNAL LINKS */
export const gMapsIntulsa = 'https://www.google.com/maps/place/36+E+Cameron+St,+Tulsa,+OK+74103,+USA';
export const mailToIntulsa = 'mailto:info@intulsa.com?subject=Message%20from%20Talent%20InTulsa%20website';
export const careersInTulsa = 'https://www.careers.intulsa.com/';
export const exploreCareers = 'https://www.careers.intulsa.com/?utm_source=talentwebsite&amp;utm_medium=web&amp;utm_campaign=footer';
export const joinTalentNetwork = 'https://www.jobs.intulsa.com/talent-network?utm_source=talentwebsite&amp;utm_medium=web&amp;utm_campaign=footer';
export const intulsa = 'https://www.intulsa.com';
export const tulsaRemote = 'https://www.tulsaremote.com';
export const campusTulsa = 'https://www.campustulsa.com';
export const talentInTulsa = 'https://www.talent.intulsa.com/';
export const lifeInTulsa = 'https://talent.intulsa.com/life-in-tulsa';

/* API Links */
export const search = '/search';
// Auth
export const APIlogin = '/login';
export const APIregister = '/register';
export const APIregisterCoordinator = '/register_coordinator';
export const APIaddUser = '/add-user';
export const APIupload = '/api/upload';
export const APIaccountRecovery = '/account-recovery';
export const APIResetPassword = '/reset-password';
// Candidates
const APIcandidateBase = '/api/candidate';
export const APIcandidates = APIcandidateBase + '/search';
export const APIcandidateUpdate = APIcandidateBase + '/update';
export const APIuserUpdate = '/user/update';
export const APItoggleSaveCandidate = APIcandidateBase + '/save';
export const APIsavedCandidates = APIcandidateBase + '/saved';
export const APIsendJobsToCandidates = APIcandidateBase + '/sendJobs';
// Companies
const APIcompanyBase = '/api/company';
export const APIcompanies = APIcompanyBase + '/search';
