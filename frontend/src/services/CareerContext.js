import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const mockJobsData = [
  {
    id: '1ea36da6-8819-4617-8c09-5df46f1reg78',
    title: 'Database Administrator',
    company: 'Hobby Lobby', // ! Not in schema yet
    clientCorporationID: '05dbac7b-bf38-47ce-a8e1-d13ceebd8ee8',
    logo: 'https://res.cloudinary.com/gageeide/image/upload/v1644949352/inTulsa/hobbylobby_2_mqj2jl.webp',
    salaryRange: '$80k-$90k',
    location_city: 'Tulsa',
    location_state: 'OK',
    onSite: true,
    listingAge: '1 month',
    specialty: 'Technology'
  },
  {
    id: 'b25cf8b7-e171-4049-8e67-701b7b7b81c3',
    title: 'Software Engineer',
    company: 'Kum N Go',
    clientCorporationID: '3b7bf6bc-16de-4014-92d6-d1cbee1bc4d5',
    logo: 'https://res.cloudinary.com/gageeide/image/upload/v1644949352/inTulsa/kumgo_2_eqbzbl.webp',
    salaryRange: '$80k-$90k',
    location_city: 'Tulsa',
    location_state: 'OK',
    onSite: false,
    listingAge: '1 month',
    specialty: 'Technology'
  },
  {
    id: '2cb874e2-0510-405e-9491-183d2e0e26d7',
    title: 'Copywriter',
    company: 'OSU', // ! Not in schema yet
    clientCorporationID: 'd4c0d062-37cd-4691-b223-e09e75a638f9',
    logo: 'https://res.cloudinary.com/gageeide/image/upload/v1644949352/inTulsa/osu-logo_clipped_rev_1_3_kkpczy.webp',
    salaryRange: '$80k-$90k',
    location_city: 'Tulsa',
    location_state: 'OK',
    onSite: true,
    listingAge: '1 month',
    specialty: 'Technology'
  },
  {
    id: '07caa54e-d5f4-4b2a-95a3-7eeca90c06f5',
    title: 'Project Manager',
    company: 'GitWit',
    clientCorporationID: 'a5fa075b-90c3-4dad-97ef-87d6c2cc0922',
    logo: 'https://res.cloudinary.com/gageeide/image/upload/v1644949352/inTulsa/gitwit_2_vwj7ap.webp',
    salaryRange: '$80k-$90k',
    location_city: 'Tulsa',
    location_state: 'OK',
    onSite: false,
    listingAge: '1 month',
    specialty: 'Technology'
  },
    id: 'c79462d2-1950-4cc0-ba31-a21a566c3c9d',
    title: 'Payroll Administrator',
    company: 'Holberton',
    clientCorporationID: '36534b9b-c225-4a59-9286-8d4203d582db',
    logo: 'https://res.cloudinary.com/gageeide/image/upload/v1644949352/inTulsa/holberton_clipped_rev_1_2_oefmoi.webp',
    salaryRange: '$80k-$90k',
    location_city: 'Tulsa',
    location_state: 'OK',
    onSite: false,
    listingAge: '1 month',
    specialty: 'Sales & Biz Dev'
  },
  {
    id: 'aa5a95d0-9222-45a2-aec1-0a8772e97a92',
    title: 'Lead Instructor',
    company: 'Paycom', // ! Not in schema yet
    clientCorporationID: 'b0eda365-79b5-4e2b-8674-642f09f56eb2',
    logo: 'https://res.cloudinary.com/gageeide/image/upload/v1644949352/inTulsa/paycom_3_luhlrq.webp',
    salaryRange: '$80k-$90k',
    location_city: 'Tulsa',
    location_state: 'OK',
    onSite: true,
    listingAge: '1 month',
    specialty: 'Sales & Biz Dev'
  },
];

export const CareerContext = createContext();

const CareerProvider = ({children}) => {
  const [careers, setCareers] = useState(mockJobsData);

  const handleCareersChange = (value) => {
    setCareers(value);
  }

  return (
    <CareerContext.Provider value={{ careers, handleCareersChange }}>
      {children}
    </CareerContext.Provider>
  )
