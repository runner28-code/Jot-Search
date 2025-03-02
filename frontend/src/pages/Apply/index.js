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
  }

  function handlePhoneInputChange(value) {
    setApplicationObject({ ...applicationObject, phone: value });
  }

  function handleFileInputChange(e) {
    const { name, files } = e.target;
    setApplicationObject({ ...applicationObject, [name]: files[0] });
    setUseExistingResume(false)
  }

  function handleReferralChoice(name, value) {
    if( value === 'Community Partner') {
      setReferralChoice(true);
    }
    if( value !== 'Community Partner' ) {
      setReferralChoice(false);
      setApplicationObject({
        ...applicationObject,
        community: ''
      });
    }
    handleChange(name, value);
  }

  function handleCommunityChoice(name, value) {
    setApplicationObject({
      ...applicationObject,
      referredBy: value
    })
    setReferralChoice(false);
  }

  const labelStyles = 'w-full';
  const labelTextStyles = 'text-xs vw-768:text-base text-charcoal leading-8 mt-8 ';
  const inputStyles = 'block w-full bg-lightGrey leading-8 text-sm vw-768:text-base border border-solid border-charcoal rounded-xl px-4 py-s mt-2 cursor-pointer disabled:bg-midGrey disabled:cursor-not-allowed ';

  if ( career.loading || applicationObject.loading ) {
    return <LoadingSpinner viewportCentered />
  }

  return (<>
    <PageHeader
      headerText='Application Form'
      IconComponent={HiOutlineClipboardCheck}
      classOverride='h-20 w-20 stroke-royalBlue'
      colorizeStroke
      backButton
    />
    <form
      onSubmit={handleSubmit}
      className='w-80% mx-auto bg-white border-lightGrey border-2 border-solid rounded-xl pt-24 pb-24 px-l vw-1280:w-90% vw-1280:mx-0 vw-1280:px-xxl-3 vw-1280:pt-xxl vw-1280:pb-xxl-4'
    >
      {/* Form Header */}
      <div className='flex items-center mb-4 vw-1280:mb-xxl-4'>
        {/* Company Logo */}
        <div className='w-34 h-34 mr-6 vw-768:w-40 vw-768:h-40 vw-1280:w-48 vw-1280:h-48 vw-1280:mr-xl'>
          {career.company.logo ?
            <img
              src={career.company.logo}
              alt={`${career.company.name} logo`}
              className='object-contain w-full h-full'
            />
            :
            <CareerIcon className='object-contain w-full h-full fill-royalBlue' />
          }
        </div>
        {/* Apply to {companyName} for {careerTitle} */}
        <div>
          <p className='text-ml font-semibold font-spaceGrotesk text-charcoal vw-768:text-lg vw-1280:text-royalBlue vw-1280:uppercase vw-1280:text-md'>Apply to</p>
          <p className='text-md font-semibold font-spaceGrotesk text-charcoal vw-768:text-ml vw-1280:text-xl vw-1280:mt-2'>{career.company.name}</p>
          <p className='text-sm vw-768:text-base text-charcoal vw-1280:mt-2'>{career.title}</p>
        </div>
      </div>
      <hr className='mb-18' />
      {/* Form Inputs */}
      <div className='w-full px-l'>
        <div className='vw-1280:flex flex-col'>
          <div className='vw-1280:flex gap-12'>
            <label
              htmlFor='firstname'
              className={labelStyles}
            >
              <p className={labelTextStyles}>First Name</p>
              <input
                type='text'
                name='firstname'
                id='firstname'
                placeholder='First Name'
                value={applicationObject.firstname}
                onChange={handleInputChange}
                className={inputStyles}
                required
              />
            </label>
            <label
              htmlFor='lastname'
              className={labelStyles}
            >
              <p className={labelTextStyles}>Last Name</p>
              <input
                type='text'
                name='lastname'
                id='lastname'
                placeholder='Last Name'
                value={applicationObject.lastname}
                onChange={handleInputChange}
                className={inputStyles}
                required
              />
// Temp comment
            </label>
          </div>
          <div className='vw-1280:flex gap-12'>
            <label
              htmlFor='email'
              className={labelStyles}
            >
              <p className={labelTextStyles}>Email</p>
              <input
                type='text'
                name='email'
                id='email'
                placeholder='Email'
                value={applicationObject.email}
                onChange={handleInputChange}
                className={inputStyles}
                required
              />
            </label>
            <label
              htmlFor='phone'
              className={labelStyles}
            >
              <p className={labelTextStyles}>Phone</p>
              <PhoneInput
                name='phone'
                country='US'
                className={inputStyles}
                value={applicationObject.phone}
                onChange={handlePhoneInputChange}
                required/>
            </label>
          </div>
          <div className='vw-1280:flex gap-12'>
            {/* <label
              htmlFor='referral'
              className={labelStyles}
            >
              <p className={labelTextStyles}>Referred By</p>
              <Dropdown
                name='referral'
                choices={jobReferralChoices}
                currentChosen={applicationObject.referral}
                handleChange={ handleInputChange }
                inputStyles={ inputStyles }
              />
            </label> */}
          </div>
        </div>
        <div className="flex flex-col pt-16">
          <span>Are you legally authorized to work in the US on a fulltime basis for any employer?</span>
          <div className='flex space-x-16'>
            <Checkbox 
              name='authorizedInUs'
              attribute='Yes'
              setOptionValue={ () => setApplicationObject({...applicationObject, authorizedInUs: true }) }
              optionValue={ applicationObject.authorizedInUs }
            />
            <Checkbox 
              name='authorizedInUs'
              attribute='No'
              setOptionValue={ () => setApplicationObject({...applicationObject, authorizedInUs: false }) }
              optionValue={ !applicationObject.authorizedInUs }
            />
          </div>
        </div>
        {/* <div className='flex flex-wrap items-center mt-16 mb-1'>
          <span className='text-lg vw-1280:text-h6 text-royalBlue font-semibold mr-2'>Voluntary</span>
          <span className='text-lg vw-1280:text-h6 text-royalBlue font-semibold'>Self-Identification</span>
        </div> */}
        <div className='vw-1280:flex flex-col'>
          {/* Pronouns (Version 2) */}
          {/* <div className='vw-1280:flex gap-12'>
            <label
              htmlFor='pronouns'
              className={labelStyles}
            >
              <p className={labelTextStyles}>Pronouns</p>
              <input
                type='text'
                name='pronouns'
                placeholder='Pronouns'
                className={inputStyles}
                onChange={ (e) => setApplicationObject({...applicationObject, pronouns: e.currentTarget.value}) }
              />
            </label>
          </div> */}
          <div className='vw-1280:flex gap-12'>
            <FormInput
              type='single-select'
              name='ethnicity'
              label={`Race / Ethnicity`}
              value={applicationObject.ethnicity}
              onChange={handleReferralChoice}
              choices={ethnicityChoices}
            />
          </div>
          <div className='vw-1280:flex gap-12'>
            <Checkbox
              name="willingToRelocate"
              attribute="I'm willing to relocate to Tulsa, OK"
              setOptionValue={ () => setApplicationObject({...applicationObject, willRelocate: !applicationObject.willRelocate }) }
              optionValue={ applicationObject.willRelocate }
            />
          </div>

          <FormInput
            type='single-select'
            name='referredBy'
            label={`How did you hear about the Talent inTulsa network?`}
            value={applicationObject.referredBy}
            onChange={handleReferralChoice}
            choices={referralChoices}
          />
          { renderCommunity(referralChoice, applicationObject, handleCommunityChoice, communityChoices) }
          
          <p className={labelTextStyles}>Upload Resume</p>
          <p className={'text-xs text-charcoal'}>(2mb max/ Format: pdf,doc,docx,rtf)</p>
          <div className="flex space-x-4 items-center justify-start flex-col items-center gap-[15px]">
            {applicationObject.resume && <div className='border-dashed border-grey300 border-1.5 rounded-lg'>
              <PDFIcon className='w-100 h-100 fill-royalBlue' />
            </div>}

            <label
              htmlFor='newResume'
              className={'cursor-pointer flex flex-col rounded-lg items-center justify-center p-4 w-100 h-100 bg-white! border-dashed border-grey300 border-1.5'}
            >
              <input
                type='file'
                name='newResume'
                id="newResume"
                placeholder='Resume'
                className='hidden'
                onChange={ handleFileInputChange }
              />
              <UploadIcon className='h-16 w-16 fill-gray-600' />
              <p>Upload</p>
            </label>
          </div>

            
          {/* { originalObject.resume && renderUseExistingResumeCheckbox( useExistingResume, setUseExistingResume) } */}
        </div>
        <div className='mt-20 flex flex-col vw-1280:flex-row items-center gap-8'>
          { renderButtonOrLoading(submissionObject, 'Submit Application', 'w-full vw-1280:w-90 text-lg bg-royalBlue text-white rounded-xl px-4 py-xs') }
          <button
            className='px-xl py-xs border-2 border-royalBlue text-royalBlue rounded-xl text-md'
            onClick={ () => navigate(-1) }
          >
          Back
          </button>
        </div>
        <div className='text-error'>
          { renderError( submissionObject.errorMessage ) }
        </div>
      </div>
    </form>
  </>)
