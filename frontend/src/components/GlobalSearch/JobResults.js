import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import urlDecode from '../../utils/urlDecode';
import * as ROUTES from '../../routes';

export default function JobResults({ jobs }) {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <>
      <h6 className='text-lg w-full text-black50% font-bold font-spaceGrotesk'>Jobs</h6>
      { jobs.map(job => {
        return (
          <JobResult 
            job={job} 
            key={job.id} />
        )
      })}
    </>
  )
}

JobResults.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
}

function JobResult({ job }) {
  job.title = urlDecode(job.title);
  const toLink = `${ROUTES.careers}/${job.id}`;
  return (
    <Link
      to={toLink} 
      className='flex w-full my-1'
    >
      <CareerIcon className='h-20 w-20 ml-2 mr-6 fill-black70%' />
      <div className='flex flex-col font-bold'>
        <p className='font-spaceGrotesk text-royalBlue text-md'>{ job.title }</p>
        <p className='font-spaceGrotesk text-blue70% text-sm'>{ '{Company Name}' }</p>
      </div>
    </Link>
  )
}

JobResult.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
}