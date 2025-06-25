import { useState } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import {
  defaultJobFilterState,
  buildSearchFilters,
} from '../../utils/filterObjects';

// Temp comment
// Images
import { IoMailOpenOutline as MailIcon } from 'react-icons/io5';
import { useSendJobsToCandidates } from '../../hooks/mutations/useSendJobsToCandidates';
import { useGetJobs } from '../../hooks/queries/useGetJobs';

export default function InviteToCareer({ candidate }) {
  const { jobs, isLoading } = useGetJobs({ filtersArr: buildSearchFilters({...defaultJobFilterState}), 
    count: 10000
  });

  const { sendJobsToCandidates, isLoading: isSendingJob, isSuccess: successfullySentJob } = useSendJobsToCandidates()

  const jobOptions = jobs?.map(job => {
    return {
      label: job.title,
      value: job.id,
      job
    }
  }) || [];
  
  const [ selected, setSelected ] = useState([]);
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
