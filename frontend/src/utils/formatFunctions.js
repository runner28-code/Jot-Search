import fixStringNulls from './fixStringNulls';
import { experienceMap } from './dbFieldMapping';
import { stateCodeMap } from './constants';

export function formatCandidateData(candidateData) {
  const formattedData = fixStringNulls(candidateData);

  formattedData.sourceTable = candidateData.id.startsWith('bl-') ? 'Candidate' : 'User'; // Some features are only available to candidates who have been added to the platform (Users)
  if (formattedData.sourceTable === 'Candidate') {
    formattedData.address1 = candidateData.address_address1 || '';
    formattedData.address2 = candidateData.address_address2 || '';
    formattedData.city = candidateData.address_city || '';
    formattedData.state = candidateData.address_state || '';
    formattedData.zip = candidateData.address_zip || '';
  }
  formattedData.address = buildCandidateAddress(candidateData);
  formattedData.avatar = formatAvatarUrl(candidateData.avatar, candidateData.firstname, candidateData.lastname);
  if ( !candidateData.occupation && !candidateData.companyName ) {
    formattedData.occupationString = 'No Occupation Provided';
  } else {
    const occupation = candidateData.occupation || 'N/A';
    const companyName = candidateData.companyName || 'N/A';
    formattedData.occupationString = `${occupation} at ${companyName}`;
  }
  formattedData.comments = candidateData.comments || 'No comments provided';
  formattedData.phone = formatPhoneNumber(candidateData.phone);
  formattedData.expertise = candidateData.expertise || 'No Expertise Chosen';
  formattedData.skills = candidateData.skills || 'No Skills Chosen';
  // If Candidate experience is a string, no need to map it
  if ( candidateData.experience && !isNaN(candidateData.experience) ) {
    formattedData.experience = candidateData.experience.toString();
  }
  // User table has firstname and lastname, Candidate table has firstName and lastName, make sure both exist until we normalize the tables
  if ( candidateData.firstName && !candidateData.firstname ) formattedData.firstname = candidateData.firstName;
  if ( candidateData.lastName && !candidateData.lastname ) formattedData.lastname = candidateData.lastName;
  if ( candidateData.firstname && !candidateData.firstName ) formattedData.firstName = candidateData.firstname;
  if ( candidateData.lastname && !candidateData.lastName ) formattedData.lastName = candidateData.lastname;

  return formattedData;
}

export function convertUserToCandidate(user) {
  const candidate = {
    id: user.id,
    firstName: user.firstname || '',
    lastName: user.lastname || '',
    name: formatCandidateName(user.firstname, user.lastname),
    email: user.email,
    phone: user.phone,
    description: user.description,
    experience: user.experience?.parseInt() || 1,
    address_address1: user.address1 || '',
    address_address2: user.address2 || '',
    address_city: user.city || '',
    address_state: user.state || '',
    address_zip: user.zip || '',
    workAuthorized: user.workAuthorized || false,
// Temp comment
    referredBy: user.referredBy || '',
    gender: user.gender || '',
    ethnicity: user.ethnicity || '',
    veteran: user.veteran || '',
    disability: user.disability || '',
  };
  return candidate;
