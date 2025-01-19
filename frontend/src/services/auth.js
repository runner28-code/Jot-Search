import decode from 'jwt-decode';
import { getSavedJobs, getSavedCompanies, getSavedCandidates } from './API';

class AuthService {
  getProfile() {
    if ( !this.loggedIn() ) {
      return null;
    }
    return decode(this.getToken());
  }

  getUserRole() {
    let role = 'guest';
    if (this.loggedIn()) {
      role = this.getProfile().role;
    }
    return role;
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        this.clearStorage();
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  async login(idToken) {
    localStorage.setItem('id_token', idToken);
    const role = this.getUserRole();
    if ( role === 'candidate' ) {
      await this.refreshSavedJobAndCompanies();
    } else if ( role === 'company' ) {
      await this.refreshSavedCandidates();
    }
    window.location.assign('/');
  }

  accountRecovery(email) {
    return email;
  }

  logout() {
    this.clearStorage();
    window.location.assign('/landing-page');
  }

  clearStorage() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('savedJobs');
    localStorage.removeItem('savedCompanies');
    localStorage.removeItem('savedCandidates');
  }

  async refreshSavedJobAndCompanies() {
    try {
      const { user_id } = this.getProfile();
      const [jobs = [], companies = []] = await Promise.all([getSavedJobs(user_id), getSavedCompanies(user_id)]);
      const jobIDs = jobs.map(job => job.id);
      const companyIDs = companies.map(company => company.id);
      localStorage.setItem('savedJobs', JSON.stringify(jobIDs));
      localStorage.setItem('savedCompanies', JSON.stringify(companyIDs));
    } catch(e) {
      console.log(e);
      localStorage.setItem('savedJobs', JSON.stringify([]));
      localStorage.setItem('savedCompanies', JSON.stringify([]));
    }
  }

  async refreshSavedCandidates() {
    try {
      const { user_id } = this.getProfile();
      const candidates = await getSavedCandidates(user_id);
      const candidateIDs = candidates.map(candidate => candidate.id);
      localStorage.setItem('savedCandidates', JSON.stringify(candidateIDs));
    } catch(e) {
      console.log(e);
      localStorage.setItem('savedCandidates', JSON.stringify([]));
    }
  }

  toggleSavedJob(jobID, action) {
    const savedJobs = this.getSavedJobIDs();
    if ( action === 'save' ) {
      savedJobs.push(jobID);
    } else {
      savedJobs.splice(savedJobs.indexOf(jobID), 1);
    }
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }

  getSavedJobIDs() {
    return JSON.parse(localStorage.getItem('savedJobs')) || [];
  }

  toggleSavedCompany(companyID, action) {
// Temp comment
    const savedCompanies = this.getSavedCompanyIDs();
    if ( action === 'save' ) {
      savedCompanies.push(companyID);
    } else {
      savedCompanies.splice(savedCompanies.indexOf(companyID), 1);
    }
    localStorage.setItem('savedCompanies', JSON.stringify(savedCompanies));
  }

  getSavedCompanyIDs() {
    return JSON.parse(localStorage.getItem('savedCompanies')) || [];
  }

  toggleSavedCandidate(candidateID, action) {
    const savedCandidates = this.getSavedCandidateIDs();
    if ( action === 'save' ) {
      savedCandidates.push(candidateID);
    } else {
      savedCandidates.splice(savedCandidates.indexOf(candidateID), 1);
    }
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }

  getSavedCandidateIDs() {
    return JSON.parse(localStorage.getItem('savedCandidates')) || [];
  }
