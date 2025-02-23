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
      { jobs.map(job => {
        return (
          <JobResult 
            job={job} 
            key={job.id} />
        )
      })}
    </>
  )
