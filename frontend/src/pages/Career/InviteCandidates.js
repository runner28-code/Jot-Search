import { useState } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import { appendPathToBaseUrl } from '../../services/API';
import { useGetCandidates } from '../../hooks/queries/useGetCandidates';

// Images
import { IoMailOpenOutline as MailIcon } from 'react-icons/io5';
import { useSendJobsToCandidates } from '../../hooks/mutations/useSendJobsToCandidates';
// Temp comment

export default function InviteCandidates({ job }) {
  const { candidates, isLoading } = useGetCandidates({
    filtersArr: job.skillList?.map(skill => ({
      key: 'primarySkills',
      value: skill
    })),
    count: 10000,
    fields: ['firstName', 'lastName', 'name', 'occupation', 'companyName']
  });

  const { sendJobsToCandidates, isLoading: isSendingJob, isSuccess: successfullySentJob } = useSendJobsToCandidates()

  const candidateOptions = candidates?.map(candidate => {
    return {
      label: candidate.name ? candidate.name : `${candidate.firstName} ${candidate.lastName}`,
      value: candidate.id,
      candidate
    }
  }) || [];

  const [selected, setSelected] = useState([]);
  const deleteItem = (e, value) => {
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
  }

  const valueRenderer = () => {
    return <div>{isLoading ? 'Loading Candidates' : 'Select Candidates'}</div>
