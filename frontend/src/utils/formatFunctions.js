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
// Temp comment
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
    referredBy: user.referredBy || '',
    gender: user.gender || '',
    ethnicity: user.ethnicity || '',
    veteran: user.veteran || '',
    disability: user.disability || '',
  };
  return candidate;
}

export function formatCandidateName(firstName, lastName) {
  if ( !firstName && !lastName ) return '';
  if ( !firstName ) return lastName;
  if ( !lastName ) return firstName;
  return `${firstName} ${lastName}`;
}

export function formatAvatarUrl(avatarUrl, firstName = 'A', lastName = 'A') {
  if ( avatarUrl ) {
    return avatarUrl;
  }
  return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0D8ABC&color=fff&size=256`;
}

export function formatPhoneNumber(phoneNumberString) {
  if ( !phoneNumberString ) {
    return 'No Phone Number Provided';
  }
  let regex = /\+\d\s\(\d{3}\) \d{3}-\d{4}/i;
  if ( regex.test(phoneNumberString) ) { // Already formatted correctly is regex passes
    return phoneNumberString;
  }
  if ( phoneNumberString.includes('-') ) { // Reset dashes. Will re-add dashes in correct format
    phoneNumberString = phoneNumberString.replace(/-/g, '');
  }
  if (phoneNumberString.length === 10) {
    const areaCode = phoneNumberString.slice(0, 3);
    const firstThree = phoneNumberString.slice(3, 6);
    const lastFour = phoneNumberString.slice(6, 10);
    return `(${areaCode}) ${firstThree}-${lastFour}`;
  }
  if ( phoneNumberString[0] === '+' ) {
    const internationalCode = phoneNumberString.slice(0, 2);
    const areaCode = phoneNumberString.slice(2, 5);
    const firstThree = phoneNumberString.slice(5, 8);
    const lastFour = phoneNumberString.slice(8, 12);
    return `${internationalCode} (${areaCode}) ${firstThree}-${lastFour}`;
  }
  return phoneNumberString;
}

// Candidates might have `experience` property instead which is a legacy property from database we migrated data from
export function formatYearsExperience(experienceYears, experience) {
  if ( experienceYears && experienceYears.length > 1 ) { // Already formatted correctly
    return experienceYears;
  } else if ( experienceYears && experienceYears.length === 1 ) { // experience code to match against experienceMap ("2" === "0-1")
    return experienceMap[experienceYears];
  } else if ( experience ) { // Legacy property
    // '1' is null (No experience selected)
    if ( experience === 1 ) {
      return 'Years Experience N/A';
    }
    return experienceMap[experience];
  } else {
    return 'Years Experience N/A';
  }
}

export function buildCandidateAddress(candidateData, full = false) {
  const { address_address1, address_address2, address_city, address_state, address_zip } = candidateData;

  let addressArr = [];
  if ( full === true ) {
    addressArr = [address_address1, address_address2, address_city, address_state, address_zip];
  } else {
    addressArr = [address_city, address_state];
  }

  let address = '';
  addressArr.forEach(line => {
    if (line && line !== 'N/A') {
      address += `${line}, `;
    }
  });
  if ( address === '' ) {
    return 'N/A';
  }
  return address.slice(0, -2);
