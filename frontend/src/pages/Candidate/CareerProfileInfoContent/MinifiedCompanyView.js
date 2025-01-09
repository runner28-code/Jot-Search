import PropTypes from 'prop-types';
import { appendPathToBaseUrl } from '../../../services/API';
import ResumePreview from './ResumePreview';

export default function MinifiedCompanyView({ candidateData }) {
  const resumeUrl = candidateData.resume ? appendPathToBaseUrl(candidateData.resume) : null;
  return (
    <div>
      <p className='text-lg text-black70% font-spaceGrotesk mb-2'>Description</p>
      <div
        dangerouslySetInnerHTML={{__html: candidateData.description || 'None listed'}}
        className='text-black70%'
      />
      <p className='text-lg text-black70% font-spaceGrotesk mt-6 mb-2'>Resume</p>
      {candidateData.resume ? <div className='border-dashed border-grey300 border-1.5 rounded-lg'>
        <ResumePreview resumeUrl={resumeUrl} /> 
      </div>
        : <p>None provided</p>}
  )
