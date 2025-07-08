import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import PhoneInput from 'react-phone-number-input/input'
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import { AiFillFilePdf as PDFIcon } from 'react-icons/ai';
import { BiUpload as UploadIcon } from 'react-icons/bi';
import FormInput from '../../components/FormInput';
import { getCandidateById, getJobById, applyToJob } from '../../services/API';
import { referralChoices, communityChoices } from '../../utils/dbFieldMapping';
import AuthService from '../../services/auth';
import { ethnicityMap, genderMap, veteranStatusMap, disabilityMap } from '../../utils/dbFieldMapping';
import {
  ethnicityChoices,
  defaultState,
  defaultCareerState,
  renderButtonOrLoading,
  formatApplicationObject,
  updateCandidateIfNeeded,
  Checkbox
} from './utils';
import LoadingSpinner from '../../components/LoadingSpinner';

const renderError = (error) => {
  if ( error ) {
    return ( <div className='text-error mt-4'>
      <p>{typeof error === 'string' ? error.toUpperCase() : 'An error has occurred when trying to process your request'}</p>
      <a href="mailto:talentnetwork@intulsa.com">Your application has failed. Please try again later, or reach out to us for support.</a>
    </div> )
  } else {
    return null;
  }
}

export default function Apply() {
  const params = useParams();
  const jobId = params?.id
  const navigate = useNavigate();
  const isLoggedIn = AuthService.loggedIn();
  // State
  const [career, setCareer] = useState(defaultCareerState);
  const [originalObject, setOriginalObject] = useState({});
  const [applicationObject, setApplicationObject] = useState(defaultState);
  const [useExistingResume, setUseExistingResume] = useState(false);
  const [referralChoice, setReferralChoice] = useState(false);
  const [submissionObject, setSubmissionObject] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: ''
  });

  useEffect(async () => {
    if ( !isLoggedIn ) {
      const careerData = await getJobById(jobId);
      setCareer(careerData);
      setOriginalObject(defaultState);
      setApplicationObject({ ...defaultState, loading: false });
      return;
    }
    try {
      const { user_id } = AuthService.getProfile();
      const [careerData, candidateData] = await Promise.all([
        getJobById(jobId),
        getCandidateById(user_id),
      ]);
      if ( candidateData.workAuthorized === true ) {
        candidateData.workAuthorized = 'Yes';
      } else {
        candidateData.workAuthorized = 'No';
      }
      // Turn API IDs into appropriate values
      candidateData.ethnicity = ethnicityMap[candidateData.ethnicity || 'U']; // 'U' is default ("Prefer not to say")
      candidateData.gender = genderMap[candidateData.gender || 'U']; // 'U' is default ("Prefer not to say")
      candidateData.disability = disabilityMap[candidateData.disability || 'U']; // 'U' is default ("Prefer not to say")
      candidateData.veteran = veteranStatusMap[candidateData.veteran || 'U']; // 'U' is default ("Prefer not to say")
      // If resume exists, select "Use Existing Resume" checkbox by default
      if ( candidateData.resume ) {
        setUseExistingResume(true);
      }
      // Adding default as profile doesn't have ethnicity to default to
      if( candidateData.ethnicity === undefined ) {
        candidateData.ethnicity = 'Prefer not to say';
      }
      const stateObject = {
        ...applicationObject,
        ...candidateData,
      };

      setCareer({ ...careerData, loading: false });
      setOriginalObject(stateObject);
      setApplicationObject({ ...stateObject, loading: false });
    } catch(e) {
// Temp comment
      console.log('error', e);
    }
  }, []);
  useEffect(async () => {
    if ( submissionObject.loading ) {
      const response = await submitData();
      if ( response.result === true ) {
        setSubmissionObject({
          loading: false,
          success: true,
        });
      } else {
        setSubmissionObject({
          loading: false,
          error: true,
          errorMessage: response.message
        });
      }
    }
  }, [submissionObject.loading]);

  useEffect(() => {
    if (submissionObject.success) {
      setTimeout(() => {
        setSubmissionObject({
          loading: false,
          success: false,
          errors: {},
        });
      }, 2000);
      navigate('/applications');
    }
  }, [submissionObject.success]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmissionObject({ loading: true });
  }

  async function submitData() {
    // Format object for API
    const formattedObject = await formatApplicationObject(applicationObject, useExistingResume);
    if ( isLoggedIn ) {
      // Check if any values have changed, update user with new values if so
      updateCandidateIfNeeded(formattedObject, originalObject);
    }

    const response = await applyToJob(jobId, formattedObject.id);
    return response
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setApplicationObject({ ...applicationObject, [name]: value });
  }

  function handleChange(name, value) {
    setApplicationObject({
      ...applicationObject,
      [name]: value,
    });
