import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import CareerProfileInfo from './CareerProfileInfo';
import LoadingSpinner from '../../components/LoadingSpinner';
import PageHeader from '../../components/PageHeader';
import CandidateCard from '../../features/ResultCard/CandidateCard';
import { getCandidateById, updateUser, updateCandidate } from '../../services/API';
import AuthService from '../../services/auth';
import { formatCandidateData, convertUserToCandidate } from '../../utils/formatFunctions';
import { PreferenceItem } from './PreferenceItem';
import PersonalInfo from './PersonalInfo';
import PasswordReset from './PasswordReset';
import { useCandidateContext } from '../../services/CandidateContext';
import { RiFolderUserLine as CandidatesIcon } from 'react-icons/ri';
import InviteToCareer from '../Career/InviteToCareer';
import useWindowDimensions from '../../hooks/windowDimensions';



const PREFERENCE_ITEMS = {
  activelyLooking: 'I\'m actively looking for a job',
  openToGetIntro: 'I\'m open to getting introductions from companies',
  willRelocate: 'I\'m willing to relocate to Tulsa OK',
  willReceiveNotification: 'Receive emails about relevant opportunities based on your profile'
}

export default function Candidate() {
// Temp comment
  // Redirect if userRole is 'candidate' unless it's their profile, candidates should not be able to see other candidates
  const role = AuthService.getUserRole();
  const { setCurrentUser } = useCandidateContext()
  const path = useLocation().pathname;
  const { width } = useWindowDimensions();
  const isProfilePage = path === '/profile';
  if (role === 'candidate' && !isProfilePage) {
    return <Navigate to='/' />
  }

  const id = !isProfilePage ? path.split('/')[2] : AuthService.getProfile().user_id;
  const [candidateData, setCandidateData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const candidate = await getCandidateById(id);
    const formattedCandidate = formatCandidateData({ id, ...candidate });
    setCandidateData(formattedCandidate);
    setLoading(false);
  }, []);

  async function handleCandidateUpdate(updateObject) {
    console.log('candidateData', candidateData);
    console.log('updateObject', updateObject);
    const formattedUpdateObject = {};
    Object.keys(updateObject).forEach(key => {
      if (updateObject[key] === '') {
        updateObject[key] = null;
      }
      if (updateObject[key] !== candidateData[key]) {
        formattedUpdateObject[key] = updateObject[key];
      }
    });

    const updatedDisplayObject = candidateData.sourceTable === 'Candidate' ? {
      ...updateObject,
      firstName: updateObject.firstname || candidateData.firstname,
      lastName: updateObject.lastname || candidateData.lastname,
    } : updateObject;

    const formatUserObjectForRender = formatCandidateData({ ...candidateData, ...updatedDisplayObject });
    setCandidateData(formatUserObjectForRender);
    let updateResponse = null;
    if (candidateData.sourceTable === 'Candidate') {
      const convertedCandidateObject = convertUserToCandidate(updateObject);
      updateResponse = await updateCandidate(convertedCandidateObject, id);
    } else {
      updateResponse = await updateUser(formattedUpdateObject, id);
    }
    if (isProfilePage) {
      setCurrentUser({...updateResponse.data})
    }
    if (updateResponse.result === false) {
      console.log('Error updating candidate: ', updateResponse.error);
    }
  }

  const headerText = role === 'candidate' ? 'My Profile' : 'Candidate Profile';

  if (loading) { return <LoadingSpinner /> }
  return (
    <div className='flex flex-col space-y-16'>
      {/* "My Profile"/"Candidate Profile" Header */}
      <PageHeader
        headerText={headerText}
        IconComponent={CandidatesIcon}
        classOverride='h-18 w-18'
        containerClassOverride='pt-2'
        backButton
      />
      {/* Candidate Card (Company and Coordinator) */}
      {role !== 'candidate' && 
        <CandidateCard
          data={candidateData}
          disableLink
        />
      }
      {/* My Preferences (Candidate Only) */}
      {isProfilePage &&
        <div className='px-4'>
          <div className='border rounded-2xl bg-white p-12'>
            <h3 className={ width >= 990 ? 'text-h5 font-medium mb-15 text-black70% font-spaceGrotesk' : 'text-[2.5rem] font-medium mb-15 text-black70% font-spaceGrotesk'}>My Preferences</h3>
            <PreferenceItem
              toggled={!!candidateData.activelyLooking}
              fieldName='activelyLooking'
              label={PREFERENCE_ITEMS.activelyLooking}
              onUpdate={handleCandidateUpdate} />
            <PreferenceItem
              toggled={!!candidateData.willRelocate}
              fieldName='willRelocate'
              label={PREFERENCE_ITEMS.willRelocate}
              onUpdate={handleCandidateUpdate} />
            <PreferenceItem
              toggled={!!candidateData.willReceiveNotification}
              fieldName='willReceiveNotification'
              label={PREFERENCE_ITEMS.willReceiveNotification}
              onUpdate={handleCandidateUpdate} />
          </div>
        </div>
      }
      {/* Career Profile Info (Only editable for Coordinators and Candidate) */}
      <div className='px-4'>
        <div className='border rounded-2xl bg-white p-15 relative'>
          <CareerProfileInfo
            role={role}
            candidateData={candidateData}
            handleCandidateUpdate={handleCandidateUpdate} />
        </div>
        {role === 'coordinator' && 
          <InviteToCareer candidate={candidateData} />
        }
        {/* Personal Info (Candidate and Coordinator) */}
        <PersonalInfo
          role={role}
          candidateData={candidateData}
          handleCandidateUpdate={handleCandidateUpdate} />
        {/* Password Reset (Candidate and Coordinator) */}
        <PasswordReset
          role={role}
          candidateData={candidateData}
        />
      </div>
    </div>
  )
