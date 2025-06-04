import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AuthService from './auth';
import { getCandidateById } from './API';

const mockCandidateData = [
  {
    id: 'cb4f35ed-db88-410f-beb0-a6a449135f75',
    firstName: 'Zach',
    lastName: 'Alvstad',
    linkedin_url: 'https://www.linkedin.com/',
    avatar_url: 'https://res.cloudinary.com/gageeide/image/upload/v1646418205/inTulsa/team/zach_3_t1naqe.webp', // Missing from Bullhorn Schema
    occupation: 'Software Engineer',
    companyName: 'Aerovision',
    address_city: 'Tulsa',
    address_state: 'OK',
    primarySkills: 'JavaScript, React, PHP, SQL',
    school: 'Oklahoma State',
    isLooking: true,
    isWarm: true,
  },
  {
    id: 'b5a00114-1d3d-40f3-afb9-fc542fa22af6',
    firstName: 'Lee',
    lastName: 'Easton',
    linkedin_url: 'https://www.linkedin.com/',
    avatar_url: 'https://res.cloudinary.com/gageeide/image/upload/v1646418205/inTulsa/team/lee_5_swk4qj.webp', // Missing from Bullhorn Schema
    occupation: 'Owner / President',
    companyName: 'Aerovision',
    address_city: 'Tulsa',
    address_state: 'OK',
    primarySkills: 'JavaScript, React, PHP, SQL',
    school: 'Oklahoma State',
    isLooking: false,
    isWarm: true,
  },
  {
    id: '53dde141-ac80-4eee-af38-5497ee1c85d5',
    firstName: 'Rachel',
    lastName: 'McAlpin',
    linkedin_url: 'https://www.linkedin.com/',
    avatar_url: 'https://res.cloudinary.com/gageeide/image/upload/v1646418205/inTulsa/team/rachel_2_fekvfg.webp', // Missing from Bullhorn Schema
    occupation: 'Project Manager',
    companyName: 'Aerovision',
    address_city: 'Tulsa',
    address_state: 'OK',
    primarySkills: 'JavaScript, React, PHP, SQL',
    school: 'Oklahoma',
    isLooking: false,
    isWarm: false,
  },
  {
    id: '04bd7f2a-2bcf-4d37-9f9b-3dbb8dd91672',
    firstName: 'Curtis',
    lastName: 'Kline',
    linkedin_url: 'https://www.linkedin.com/',
    profile_img: 'https://res.cloudinary.com/gageeide/image/upload/v1646418205/inTulsa/team/curtis_2_qs35yb.webp', // Missing from Bullhorn Schema
    occupation: 'Tech Consultant',
    companyName: 'Aerovision',
    address_city: 'Tulsa',
    address_state: 'OK',
    primarySkills: 'JavaScript, React, PHP, SQL',
    school: 'Oklahoma State',
    isLooking: true,
    isWarm: false,
  },
  {
    id: 'ec0d90fb-f73c-4d4c-9e13-d720a14440f5',
    firstName: 'Donnie',
    lastName: 'Kim',
    linkedin_url: 'https://www.linkedin.com/',
    profile_img: 'https://res.cloudinary.com/gageeide/image/upload/v1646418205/inTulsa/team/donnie_1_l00n0o.webp', // Missing from Bullhorn Schema
    occupation: 'Softwware Engineer',
    companyName: 'Aerovision',
    address_city: 'Tulsa',
    address_state: 'OK',
    primarySkills: 'JavaScript, React, PHP, SQL',
    school: 'Oklahoma State',
    isLooking: false,
    isWarm: false,
  },
  {
    id: '1ea36da6-8819-4617-8c09-5df46f1reg78',
    firstName: 'Lawrence',
    lastName: 'MacAlpine',
    linkedin_url: 'https://www.linkedin.com/',
    profile_img: 'https://res.cloudinary.com/gageeide/image/upload/v1646418205/inTulsa/team/lawrence_1_szacre.webp', // Missing from Bullhorn Schema
    occupation: 'Compliance',
    companyName: 'Apline Strategies',
    address_city: 'Tulsa',
    address_state: 'OK',
    primarySkills: 'JavaScript, React, PHP, SQL',
    school: 'Oklahoma State',
// Temp comment
    isLooking: false,
    isWarm: false,
  },
];

export const CandidateContext = createContext();
export const useCandidateContext = () => useContext(CandidateContext)

const CandidateProvider = ({children}) => {
  const [candidates, setCandidates] = useState(mockCandidateData);
  const [currentUser, setCurrentUser] = useState(AuthService.getProfile());

  useEffect(() => {
    if (currentUser?.user_id) {
      getCandidateById(currentUser.user_id).then(user => {
        setCurrentUser(user);
      })
    }
  }, []);

  const handleCandidatesChange = (value) => {
    setCandidates(value);
  }

  const handleCandidateUpdate = (updatedValues) => {
    const currentCandidateData = candidates.find(candidate => candidate.id === updatedValues.id);
    const updatedCandidate = { ...currentCandidateData, ...updatedValues };

    const filteredCandidates = candidates.filter(candidate => candidate.id !== updatedValues.id);
    setCandidates([...filteredCandidates, updatedCandidate]);
  }

  return (
    <CandidateContext.Provider value={{ candidates, currentUser, setCurrentUser, handleCandidatesChange, handleCandidateUpdate }}>
      {children}
    </CandidateContext.Provider>
  )
