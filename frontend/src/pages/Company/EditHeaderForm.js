import { useState } from 'react';
import { MdLocationOn, MdCancel, MdCheckCircle } from 'react-icons/md';
import PropTypes from 'prop-types';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { appendPathToBaseUrl } from '../../services/API';

export default function EditHeaderForm({ candidateData, handleCandidateUpdate, setEditMode, iconStyles }) {
  const [formData, setFormData] = useState({
    id: candidateData.id,
    avatar: candidateData.avatar,
    companyName: candidateData.companyName,
    address1: candidateData.address1,
    address2: candidateData.address2,
    city: candidateData.city,
    state: candidateData.state,
    zip: candidateData.zip,
  });

    const { name, value } = event.target;
    if ( name === 'avatar' ) {
      const imageToUpload = event.target.files[0];
      console.log(imageToUpload);
    }
    setFormData({ ...formData, [name]: value });
  }

  const handleCancel = () => {
    setEditMode(false);
