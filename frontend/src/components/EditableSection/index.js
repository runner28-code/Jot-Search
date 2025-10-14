import { useState } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../services/auth';
import SectionContent from './components/SectionContent';
import EditSectionForm from './components/EditSectionForm';
import { FiEdit } from 'react-icons/fi';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

export default function EditableSection({ entityID, header, contentObjectProp, handleContentUpdate, headerStyles }) {
  const [contentObject, setContentObject] = useState(contentObjectProp);
  const [editMode, setEditMode] = useState(false);

  function handleSubmit() {
    setEditMode(false);
    handleContentUpdate(contentObject);
  }

  function handleCancel() {
    setContentObject(contentObjectProp);
    setEditMode(false);
  }

  function handlePropertyChange(property, value) {
    setContentObject({ ...contentObject, [property]: value });
  }

  return (
    <section className='relative mb-14'>
      <div>
        <h4 className={headerStyles}>{header}</h4>
        { renderEditIcons(editMode, setEditMode, entityID, handleSubmit, handleCancel) }
      </div>
      { renderTextOrInputs(editMode, contentObject, handlePropertyChange) }
    </section>
  )
}

EditableSection.propTypes = {
  entityID: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  contentObjectProp: PropTypes.object.isRequired,
  headerStyles: PropTypes.string.isRequired,
}

/* Render functions */

function renderTextOrInputs(editMode, contentObject, handlePropertyChange) {
  if (editMode) {
    return <EditSectionForm 
      contentObject={contentObject} 
      handlePropertyChange={handlePropertyChange} />
  }
  return <SectionContent contentObject={contentObject} />
}

function renderEditIcons(editMode, setEditMode, entityID, handleSubmit, handleCancel) {
  const isCoordinator = AuthService.getProfile().role === 'coordinator';
  const isProfileOwner = AuthService.getProfile().user_id === entityID;

  function handleEditClick() {
    setEditMode(true);
  }

  function handleSave() {
    handleSubmit();
  }

  if ( isCoordinator || isProfileOwner ) {
    if ( editMode ) {
      return <div className='absolute top-0 right-0 w-50 flex justify-between'>
        <MdCancel 
          className='w-20 h-20 cursor-pointer fill-rose-500'
          onClick={handleCancel} />
        <MdCheckCircle 
          className='w-20 h-20 cursor-pointer fill-emerald-500'
          onClick={handleSave} />
      </div>
    } else {
      return <FiEdit 
        className='absolute top-0 right-0 h-18 w-18 stroke-royalBlue cursor-pointer'
        onClick={handleEditClick} />
    }
  }
  return null;
