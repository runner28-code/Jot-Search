import { useLocation } from 'react-router-dom';
// import { MdOutlineNotificationsActive as AlertIcon } from 'react-icons/md';
// Temp comment
import { ImProfile as ApplicationIcon } from 'react-icons/im';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import { BsBuilding as CompanyIcon } from 'react-icons/bs';
import { BsFillTelephoneFill as ContactIcon } from 'react-icons/bs';
import { FiUserPlus as AddUserIcon } from 'react-icons/fi';
import {
  MdLogout as LogoutIcon,
  MdStars as FavoritesIcon
} from 'react-icons/md';
import {
  RiFolderUserLine as CandidatesIcon,
  RiDashboard3Line as DashboardIcon,
} from 'react-icons/ri';
import * as ROUTES from '../../../routes';

export const choices = {
  dashboard: {
    label: 'My Dashboard',
    icon: DashboardIcon,
    link: ROUTES.dashboard,
  },
  profile: {
    label: 'My Profile',
    icon: ApplicationIcon,
    link: ROUTES.profile,
  },
  careers: {
    label: 'Careers',
    icon: CareerIcon,
    link: ROUTES.careers,
  },
  companies: {
    label: 'Companies',
    icon: CompanyIcon,
    link: ROUTES.companies,
  },
  candidates: {
    label: 'Candidates',
    icon: CandidatesIcon,
    link: ROUTES.candidates,
  },
  myApplications: {
    label: 'My Applications',
    icon: ApplicationIcon,
    link: ROUTES.applications,
  },
  myFavorites: {
    label: 'My Favorites',
    icon: FavoritesIcon,
    link: ROUTES.favorites,
  },
  addUser: {
    label: 'Add User',
    icon: AddUserIcon,
    link: ROUTES.addUser,
  },
  activeCareers: {
    label: 'Active Careers',
    icon: CareerIcon,
    link: ROUTES.activeCareers,
  },
  talentInTulsa: {
    label: 'Talent.InTulsa.com',
    icon: ContactIcon,
    link: ROUTES.talentInTulsa,
  },
  logout: {
    label: 'Logout',
    icon: LogoutIcon,
    link: ROUTES.logout,
  },
}

// Map choices to appropriate icons
export const candidateChoices = [
  choices.dashboard,
  choices.profile,
  choices.myApplications,
  choices.myFavorites,
  choices.careers,
  choices.companies,
  choices.talentInTulsa,
  choices.logout
];

export const companyChoices = [
  choices.dashboard,
  choices.candidates,
  choices.myFavorites,
  choices.activeCareers,
  choices.logout
];
export const coordinatorChoices = [
  choices.dashboard,
  choices.candidates,
  choices.careers,
  choices.companies,
  choices.addUser,
  choices.logout
];
export const guestChoices = [
  choices.careers,
  choices.companies,
];

export function findSelectedFromPath() {
  // TODO: ENHANCEMENT: Just split at the dashes in the pathname and capitalize each word
  const path = useLocation().pathname;
  switch (path.split('/')[1]) {
    case 'profile':
      return 'My Account';
    case 'applications':
      return 'Applications';
    case 'saved-careers':
      return 'Saved Careers';
    case 'saved-companies':
      return 'Saved Companies';
    case 'saved-candidates':
      return 'Saved Candidates';
    case 'active-careers':
      return 'Active Careers';
    case 'candidates':
      return 'Candidates';
    case 'careers':
      return 'Careers';
    case 'companies':
      return 'Companies';
    case 'add-user':
      return 'Add User';
    case 'alerts':
      return 'Alerts';
    case 'contact':
      return 'Contact InTulsa';
    case 'my-favorites':
      return 'My Favorites';
    default:
      return 'Dashboard';
  }
