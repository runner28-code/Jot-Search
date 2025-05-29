import { useState } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../services/auth';
import SectionContent from './components/SectionContent';
import EditSectionForm from './components/EditSectionForm';
import { FiEdit } from 'react-icons/fi';

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
