import { useState } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import { appendPathToBaseUrl } from '../../services/API';
import { useGetCandidates } from '../../hooks/queries/useGetCandidates';

// Images
import { IoMailOpenOutline as MailIcon } from 'react-icons/io5';
import { useSendCandidatesToCompanies } from '../../hooks/mutations/useSendCandidatesToCompanies';

export default function InviteCandidates({ company }) {
  const { candidates, isLoading } = useGetCandidates({ 
    filtersArr: [],
    count: 10000,
    fields: ['firstName', 'lastName', 'name', 'occupation', 'companyName']
  });

  const { sendCandidatesToCompanies, isLoading: isSendingCandidates, isSuccess: successfullySentCandidates } = useSendCandidatesToCompanies()

  const candidateOptions = candidates?.map(candidate => {
    return {
      label: candidate.name,
      value: candidate.id,
      candidate
    }
  }) || [];
  
  const [ selected, setSelected ] = useState([]);
  const deleteItem = (e, value) => {
// Temp comment
    e.stopPropagation();
    setSelected(selected.filter(item => item.value !== value))
  }

  const SelectedValues = () => {
    return (<div className='flex space-x-4 flex-wrap px-4 py-4 min-h-[65px] bg-grey300 rounded-3xl'>
      {selected?.map((item) => (
        <span 
          key={item.value} 
          className="flex space-x-2 text-white items-center justify-center rounded-full bg-aquaBlue p-2 m-2">
          <span>{item.label}</span>
          <button 
            className='rounded-full text-center h-8 w-8 text-aquaBlue bg-white text-xs' 
            onClick={(e) => deleteItem(e, item.value)}>X</button>
        </span>
      ))}
    </div>)
