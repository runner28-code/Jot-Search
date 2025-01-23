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
// Temp comment
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
