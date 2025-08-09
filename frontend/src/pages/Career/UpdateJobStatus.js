import PropTypes from 'prop-types';

import { useUpdateJob } from '../../hooks/mutations/useUpdateJob'
import Dropdown from '../../components/UniversalDropdown/index';
import { useState } from 'react';

const sectionHeaderStyles = 'font-spaceGrotesk font-semibold text-h4 text-charcoal mb-m ';
const hrStyles = 'mb-10 border-smokeGray ';

export const UpdateJobStatus = ({ job }) => {
  const { saveJob, isLoading, isSuccess } = useUpdateJob()
  const [updatedJob, setUpdatedJob] = useState(job)

  return (
    <div className='py-8 flex flex-col'>
      <hr className={`${hrStyles} bg-smokeGray h-2`} />

      <div className='flex flex-col'>
        <h4 className={sectionHeaderStyles}>Career Status</h4>
        {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Success!</p>}
        <Dropdown 
          choices={[
            'Active',
            'Inactive',
            'Filled',
            'Draft',
            'Closed'
          ]} 
          currentChosen={updatedJob.status}
          name='status'
          inputStyles='w-100 vw-480:w-120 vw-640:w-140 border-lightGrey border-2 border-solid rounded-2xl p-4 vw-480:text-lg h-24 '
          optionStyles={'text-lg'}
          placeholder={'TP Career Status'}
          handleChange={async(e) => {
            const { res } = await saveJob({ status: e.target.value, id: updatedJob.id })
            setUpdatedJob(res);
          }}
        />
      </div>
  )
