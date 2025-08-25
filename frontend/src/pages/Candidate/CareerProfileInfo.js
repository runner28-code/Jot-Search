import { useState } from 'react';
import PropTypes from 'prop-types';
import CareerProfileInfoContent from './CareerProfileInfoContent';
import { FiEdit } from 'react-icons/fi';
import AuthService from '../../services/auth';
import useWindowDimensions from '../../hooks/windowDimensions';
const iconStyles = 'w-12 h-12 mr-5 ';

export default function CareerProfileInfo({ candidateData, handleCandidateUpdate, role }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      {/* Header and Edit Icon */}
      <div className='flex flex-row justify-between items-center'>
        { (!editMode && role !== 'company') && 
          renderEditIcon(candidateData, setEditMode)
        }
      </div>
      <CareerProfileInfoContent
        candidateData={candidateData}
        handleCandidateUpdate={handleCandidateUpdate}
        setEditMode={setEditMode}
        iconStyles={iconStyles}
        editMode={editMode}
        role={role}
      />
    </>
  )
}

CareerProfileInfo.propTypes = {
  candidateData: PropTypes.object.isRequired,
  handleCandidateUpdate: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired
}

function renderEditIcon(candidateData, setEditMode) {
  const handleClick = () => {
    setEditMode(true);
  }
  const isProfileOwner = candidateData.id === AuthService.getProfile().user_id;
  const isCoordinator = AuthService.getProfile().role === 'coordinator';
  if ( !isProfileOwner && !isCoordinator ) {
    return null;
  }
  const { width } = useWindowDimensions();
  if( width <= 990 ) {
    return (
      <button 
        className='testspace-x-2 text-xl leading-none py-4 justify-center items-center text-royalBlue absolute top-0 right-0 px-4 pr-6 border-solid border-royalBlue'
        onClick={handleClick}>
        <FiEdit
          className='h-[3rem] w-[3rem] ml-4 stroke-royalBlue cursor-pointer'
        />
      </button>
    )
  }
  return (
    <button 
      className='testspace-x-2 text-xl leading-none py-4 justify-center items-center text-royalBlue border-1.5 rounded-lg px-4 pr-6 border-solid border-royalBlue'
      onClick={handleClick}>
      <FiEdit
        className='h-[3rem] w-[3rem] ml-4 stroke-royalBlue cursor-pointer'
      />
      <span>Edit</span>
    </button>
  )
