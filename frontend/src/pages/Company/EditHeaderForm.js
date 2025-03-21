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

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    if ( name === 'avatar' ) {
      const imageToUpload = event.target.files[0];
      console.log(imageToUpload);
    }
    setFormData({ ...formData, [name]: value });
  }

  const handleCancel = () => {
    setEditMode(false);
  }
  const handleSubmit = () => {
    handleCandidateUpdate(formData);
    setEditMode(false);
  }
  
  const avatarUrl = appendPathToBaseUrl(formData.avatar);
  const inputStyles = 'border-lightGrey border-solid border-2 rounded-2xl pl-4 ';
  return (
    <>
      <div className='flex flex-col mr-12'>
        {/* Avatar */}
        <img
          className='w-100 h-100'
          src={avatarUrl}
          alt='Candidate Avatar' />
        <div className='mt-4'>
          <input 
            className={inputStyles + 'w-100 py-2'}
            type='file'
            name='avatar'
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='grow font-bold'>
        {/* First Name */}
        <div className='mb-6'>
          <label 
            className='text-h6 text-royalBlue w-full'
            htmlFor='name'>
          Name
          </label>
          <input 
            type='text'
            onChange={handleInputChange}
            id='name'
            name='name'
            value={formData.name}
            className={inputStyles + 'text-h6 w-full'} />
        </div>
        {/* Last Name */}
        <div className='mb-6'>
          <label 
            className='text-h6 text-royalBlue w-full'
            htmlFor='lastname'>
          Last Name
          </label>
          <input 
            type='text'
            onChange={handleInputChange}
            id='lastname'
            name='lastname'
            value={formData.lastname}
            className={inputStyles + 'text-h6 w-full'} />
        </div>
        {/* Occupation */}
        <div className='mb-6'>
          <label 
            className='text-h6 text-royalBlue w-full'
            htmlFor='occupation'>
          Occupation
          </label>
          <input 
            type='text'
            onChange={handleInputChange}
            id='occupation' 
            name='occupation' 
            value={formData.occupation}
            className={inputStyles + 'text-h6 w-full'} />
        </div>
        {/* Company */}
        <div className='mb-6'>
          <label 
            className='text-h6 text-royalBlue w-full'
            htmlFor='companyName'>
          Company
          </label>
          <input 
            type='text'
            onChange={handleInputChange}
            id='companyName' 
            name='companyName' 
            value={formData.companyName}
            className={inputStyles + 'text-h6 w-full'} />
        </div>
        {/* Address */}
        <div className='mb-10'>
          <div className='flex items-center'>
            <MdLocationOn
              className={iconStyles + 'fill-royalBlue'} />
            <h2 className='text-h6 text-royalBlue'>Location</h2>
          </div>
          <div className='flex flex-col'>
            <div className='flex justify-between mb-4'>
              <label 
                className='text-h6 text-royalBlue w-full'
                htmlFor='address1'>
              Address 1:
              </label>
              <input 
                type='text'
                onChange={handleInputChange}
                id='address1'
                name='address1'
                value={formData.address1}
                className={inputStyles + 'ml-10 text-h6'} />
            </div>
            <div className='flex justify-between mb-4'>
              <label 
                className='text-h6 text-royalBlue w-full'
                htmlFor='address2'>
              Address 2:
              </label>
              <input 
                type='text'
                onChange={handleInputChange}
                id='address2'
                name='address2'
                value={formData.address2}
                className={inputStyles + 'ml-10 text-h6'} />
            </div>
            <div className='flex justify-between mb-4'>
              <label 
                className='text-h6 text-royalBlue w-full'
                htmlFor='city'>
              City:
              </label>
              <input 
                type='text'
                onChange={handleInputChange}
                id='city'
                name='city'
                value={formData.city}
                className={inputStyles + 'ml-10 text-h6'} />
            </div>
            <div className='flex justify-between mb-4'>
              <label 
                className='text-h6 text-royalBlue w-full'
                htmlFor='state'>
              State:
              </label>
              <input 
                type='text'
                onChange={handleInputChange}
                id='state'
                name='state'
                value={formData.state}
                className={inputStyles + 'ml-10 text-h6'} />
            </div>
            <div className='flex justify-between mb-4'>
              <label 
                className='text-h6 text-royalBlue w-full'
                htmlFor='zip'>
              Zip:
              </label>
              <input 
                type='text'
                onChange={handleInputChange}
                id='zip'
                name='zip'
                value={formData.zip}
                className={inputStyles + 'ml-10 text-h6'} />
            </div>
          </div>
        </div>
        {/* Phone */}
        <div className='flex items-center justify-between mb-4'>
          <label
            className='text-h6 text-royalBlue flex items-center'
            htmlFor='phone'
          >
            <FaPhoneAlt
              className={iconStyles + 'fill-royalBlue'} />
              Phone:
          </label>
          <input 
            type='text'
            onChange={handleInputChange}
// Temp comment
            id='phone'
            value={formData.phone}
            className={inputStyles + 'ml-10 text-h6'} />
        </div>
        {/* Email */}
        <div className='flex items-center justify-between mb-4'>
          <label
            className='text-h6 text-royalBlue flex items-center'
            htmlFor='email'
          >
            <IoIosMail
              className={iconStyles + 'fill-royalBlue'} />
              Email:
          </label>
          <input 
            type='text'
            onChange={handleInputChange}
            id='email'
            value={formData.email}
            className={inputStyles + 'ml-10 text-h6'} />
        </div>
        {/* Cancel/Save Buttons */}
        <div className='flex justify-evenly mt-8'>
          <MdCancel 
            className='w-24 h-24 cursor-pointer fill-rose-500'
            onClick={handleCancel} />
          <MdCheckCircle 
            className='w-24 h-24 cursor-pointer fill-emerald-500'
            onClick={handleSubmit} />
        </div>
      </div>
    </>
  )
