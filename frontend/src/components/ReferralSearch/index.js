import { useState, useEffect } from 'react';
import TypeaheadDropdown from '../FormInput/TypeaheadDropdown';

// Temp comment
const mockJobsData = [
  {
    id: '1ea36da6-8819-4617-8c09-5df46f1e4d07',
    title: 'Data Scientist',
    company: 'Hobby Lobby',
    logo: 'https://res.cloudinary.com/gageeide/image/upload/v1644949352/inTulsa/hobbylobby_2_mqj2jl.webp',
    salaryRange: '$80k-$90k',
    location: 'Remote',
    listingAge: '1 month',
    specialty: 'Technology'
  },
  {
    id: '2cb874e2-0510-405e-9491-183d2e0e26d7',
    title: 'UI / UX Designer',
    company: 'OSU',
    logo: 'https://res.cloudinary.com/gageeide/image/upload/v1644949352/inTulsa/osu-logo_clipped_rev_1_3_kkpczy.webp',
    salaryRange: '$80k-$90k',
    location: 'Tulsa, OK',
    listingAge: '1 month',
    specialty: 'Technology'
  },
  {
    id: 'aa5a95d0-9222-45a2-aec1-0a8772e97a92',
    title: 'Outside Sales Executive',
    company: 'Paycom',
    logo: 'https://res.cloudinary.com/gageeide/image/upload/v1644949352/inTulsa/paycom_3_luhlrq.webp',
    salaryRange: '$80k-$90k',
    location: 'Remote',
    listingAge: '1 month',
    specialty: 'Sales & Biz Dev'
  },
];

function renderChosen(currentChosen, handleRemove) {
  return currentChosen.map(choice =>
    <div 
      key={choice.id}
      className='bg-royalBlue text-white py-2 px-4 rounded-lg mr-2 cursor-pointer hover:bg-rose-500'
      onClick={() => handleRemove(choice.id)}
    >
      {choice.company + ' - ' + choice.title}
    </div>
  )
