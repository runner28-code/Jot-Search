import { useState, useEffect } from 'react';
import TypeaheadDropdown from '../FormInput/TypeaheadDropdown';

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
}

export default function ReferralSearch() {
  const [choices, setChoices] = useState(mockJobsData);
  const [filteredChoices, setFilteredChoices] = useState(mockJobsData);
  const [currentChosen, setCurrentChosen] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleAdd(_, jobArray) {
    const idToAdd = jobArray[jobArray.length - 1];
    const jobToAdd = choices.find(job => job.id === idToAdd);

    if (!jobToAdd) return;
    const newFilteredChoices = filteredChoices.filter(job => job.id !== idToAdd);
    setCurrentChosen([ ...currentChosen, jobToAdd ]);
    setFilteredChoices(newFilteredChoices);
  }

  function handleRemove( jobId ) {
    const newCurrentChosen = currentChosen.filter(job => job.id !== jobId);
    setCurrentChosen(newCurrentChosen);
    setFilteredChoices([ ...filteredChoices, choices.find(job => job.id === jobId) ]);
  }

  // set up initial choices
  useEffect(() => {
    // TODO: Implement API
    setChoices(mockJobsData);
  }, []);
  
  return (
    <div className='w-340'>
      <div className='flex mb-8'>
        { renderChosen(currentChosen, handleRemove) }
      </div>
      <TypeaheadDropdown
        type='text'
        dropdownType='list-select'
        name='referrals'
        placeholder='Select a job to refer...' 
        currentChosen={currentChosen}
        onChange={handleAdd}
        choices={filteredChoices}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        baseStyles='w-full text-xl font-bold border-lightGrey border-solid border-2 rounded-2xl pl-24 placeholder-black '
        inputHeight='h-40 '
      />
    </div>
