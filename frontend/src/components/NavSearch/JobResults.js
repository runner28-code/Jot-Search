import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import urlDecode from '../../utils/urlDecode';

export default function JobResults({ jobs }) {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <>
      <h6 className='text-lg w-full text-black50% font-bold font-spaceGrotesk'>Careers</h6>
      { jobs.map(job => {
        return (
          <JobResult 
            job={job} 
            key={job.id} />
        )
      })}
    </>
  )
