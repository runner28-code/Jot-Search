import { useState, useContext } from 'react';
import { CategoryContext } from '../../../services/CategoryContext';
import PropTypes from 'prop-types';
import { uploadFile, appendPathToBaseUrl } from '../../../services/API';
import FormInput from '../../../components/FormInput';
import {
  skills as skillChoices,
  roles as roleChoices,
} from '../../../utils/skillHierarchyMap';
import { experienceMap } from '../../../utils/dbFieldMapping';
import { BiUpload as UploadIcon } from 'react-icons/bi';
import ResumePreview from './ResumePreview';

export default function ExtendedEditableContent({ candidateData, handleCandidateUpdate, setEditMode, editMode }) {
  const { categories } = useContext(CategoryContext);
  const isSourceUserTable = candidateData.sourceTable === 'User';

  const [formData, setFormData] = useState({
    id: candidateData.id,
    avatar: candidateData.avatar || '',
    firstname: candidateData.firstname || '',
    lastname: candidateData.lastname || '',
    occupation: candidateData.occupation || '',
    companyName: candidateData.companyName || '',
    address1: candidateData.address1 || '',
    address2: candidateData.address2 || '',
    state: candidateData.state || '',
    zip: candidateData.zip || '',
    phone: candidateData.phone || '',
    categoryId: candidateData.categoryId || null,
    expertise: categories.find(category => category.id === candidateData.categoryId)?.name || '',
    roles: Array.isArray(candidateData.roles) ? candidateData.roles : (candidateData?.roles?.split(', ') || []),
    description: candidateData.description || '',
    workspace: candidateData?.workspace || '',
    experience: candidateData?.experience || '',
    skills: Array.isArray(candidateData.skills) ? candidateData.skills : (candidateData?.skills?.split(', ') || []),
    linkedin: candidateData?.linkedin || '',
    resume: candidateData?.resume || '',
  });

  function handleChange(name, value) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    if (name === 'avatar' || name === 'resume') {
      const fileToUpload = event.target.files[0];
      const pluralizedFolderName = name + 's';
      const newPath = await uploadFile(pluralizedFolderName, fileToUpload);
      console.log(newPath);
      return setFormData({ ...formData, [name]: newPath });
    }
    setFormData({ ...formData, [name]: value });
  }

  const handleCancel = () => {
    setEditMode(false);
