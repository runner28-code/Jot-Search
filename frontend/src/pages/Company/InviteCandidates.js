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
  }
  
  return (
    <section className="flex flex-col space-y-8 bg-white p-xxl-4 border-2 border-disabled border-solid rounded-3xl mb-xxl-4">
      <h2 className="text-h4">Send Candidates to Company</h2>

      {isSendingCandidates && <div className="text-center">Sending Invitations...</div>}
      {successfullySentCandidates && <div className="text-center">Invitations Sent!</div>}

      <SelectedValues />

      <MultiSelect
        isLoading={isLoading}
        options={candidateOptions}
        value={selected}
        onChange={setSelected}
        ItemRenderer={itemRenderer}
        valueRenderer={valueRenderer}
        hasSelectAll={false}
      />
      <div className='flex space-x-8'>
        <button 
          className='bg-blue-500 text-white text-lg rounded-md px-4 py-2 flex justify-center items-center'
          onClick={async () => {
            console.log({selected})
            const res = await sendCandidatesToCompanies({ companyIds: [company.id], candidateIds: selected.map((option) => option.value) })
            console.log({res})
            if(res.result){
              setSelected([])
            }
          }}
          disabled={selected.length === 0 || isSendingCandidates}
        >
          <MailIcon className='inline-block mr-2' />
          Send Now
        </button>
        <button 
          onClick={() => setSelected([])} 
          className='bg-white text-blue-500 border-blue-500 border-1.5 text-lg  rounded-md px-4 py-2'>Clear all</button>
      </div>
    </section>
  )
