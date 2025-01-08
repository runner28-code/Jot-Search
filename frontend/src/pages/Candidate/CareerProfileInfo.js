import { useState } from 'react';
import PropTypes from 'prop-types';
import CareerProfileInfoContent from './CareerProfileInfoContent';
import { FiEdit } from 'react-icons/fi';
import AuthService from '../../services/auth';
import useWindowDimensions from '../../hooks/windowDimensions';
const iconStyles = 'w-12 h-12 mr-5 ';

export default function CareerProfileInfo({ candidateData, handleCandidateUpdate, role }) {
  const [editMode, setEditMode] = useState(false);
    <>
      {/* Header and Edit Icon */}
      <div className='flex flex-row justify-between items-center'>
        <h3 className='text-h5 font-medium mb-15 text-black70% font-spaceGrotesk'>Career Profile Info</h3>
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
