import { useState } from 'react';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input/input'
import Dropdown from '../../components/UniversalDropdown';
import FormInput from '../../components/FormInput';
import { SwitchButton } from './PreferenceItem';
import { FiEdit } from 'react-icons/fi';
import useWindowDimensions from '../../hooks/windowDimensions';
import {
  ethnicityChoices,
  genderChoices,
  veteranStatusChoices
// Temp comment
} from '../Apply/utils';
import { referralChoices, communityChoices } from '../../utils/dbFieldMapping';
import AuthService from '../../services/auth';

const PREFERENCE_ITEMS = {
  workAuthorized: 'Are you legally authorized to work in the US on a fulltime basis for any employer?',
}

export default function PersonalInfo({role, candidateData, handleCandidateUpdate}) {
  if ( role === 'company' ) {
    return null;
  }
  const [formData, setFormData] = useState({
    firstname: candidateData.firstname || '',
    lastname: candidateData.lastname || '',
    email: candidateData.email || '',
    phone: candidateData.phone || '',
    workAuthorized: candidateData.workAuthorized,
    zip: candidateData.zip || '',
    city: candidateData.city || '',
    address1: candidateData.address1 || '',
    referredBy: candidateData.referredBy || '',
    gender: candidateData.gender || '',
  })

  const [editMode, setEditMode] = useState(false);

  const [referralChoice, setReferralChoice] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleChange(name, value) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleReferralChoice(name, value) {
    if( value === 'Community Partner') {
      setReferralChoice(true);
    }
    if( value !== 'Community Partner' ) {
      setReferralChoice(false);
      setFormData({
        ...formData,
        community: ''
      });
    }
    handleChange(name, value);
  }

  function handleCommunityChoice(name, value) {
    setFormData({
      ...formData,
      referredBy: value
    })
    setReferralChoice(false);
  }

  function handlePhoneInputChange(value) {
    setFormData({ ...formData, phone: value });
  }

  const disabled = !editMode;
  
  const labelStyles = 'w-full';
  const labelTextStyles = 'text-xs vw-768:text-base text-charcoal leading-8 mt-8 ';
  const inputStyles = 'disabled:disabled disabled:cursor-not-allowed block w-full bg-lightGrey leading-8 text-sm vw-768:text-base border border-solid border-charcoal rounded-xl px-4 py-s mt-2 cursor-pointer disabled:bg-grey300 disabled:cursor-not-allowed ';

  async function submitData() {
    handleCandidateUpdate(formData)
    setEditMode(false);
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  const isSourceUserTable = candidateData.sourceTable

  console.log({ isSourceUserTable })

  return (
    <div className='mb-9 border rounded-2xl bg-white p-12'>
      <form onSubmit={onSubmit}>
        <div className='flex justify-between items-center'>
          <h3 className='text-h5 font-medium mb-15 text-black70% font-spaceGrotesk'>Personal Info</h3>
          { !editMode && renderEditIcon(candidateData, setEditMode)}
        </div>
        
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
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className={inputStyles}
                  required
                  disabled={disabled}
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
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className={inputStyles}
                  required
                  disabled={disabled}
                />
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
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputStyles}
                  required
                  disabled
                />
              </label>
              <label
                htmlFor='phone'
                className={labelStyles}
              >
                <p className={labelTextStyles}>Phone</p>
                <PhoneInput
                  name='phone'
                  international
                  withCountryCallingCode
                  className={inputStyles}
                  value={formData.phone}
                  onChange={handlePhoneInputChange}
                  disabled={disabled}
                  required/>
              </label>
            </div>
            <div className='vw-1280:flex gap-12'>
              <label
                htmlFor='address1'
                className={labelStyles}
              >
                <p className={labelTextStyles}>Address</p>
                <input
                  type='text'
                  name='address1'
                  id='address1'
                  placeholder='Address'
                  value={formData.address1}
                  onChange={handleInputChange}
                  className={inputStyles}
                  required
                  disabled={disabled}
                />
              </label>
            </div>
            <div className='vw-1280:flex gap-12'>
              <label
                htmlFor='zip'
                className={labelStyles}
              >
                <p className={labelTextStyles}>Zip/Postal Code</p>
                <input
                  type='text'
                  name='zip'
                  id='zip'
                  placeholder='Zip/Postal Code'
                  value={formData.zip}
                  onChange={handleInputChange}
                  className={inputStyles}
                  required
                  disabled={disabled}
                />
              </label>
              <label
                htmlFor='city'
                className={labelStyles}
              >
                <p className={labelTextStyles}>City</p>
                <input
                  type='text'
                  name='city'
                  id='city'
                  placeholder='City'
                  value={formData.city}
                  onChange={handleInputChange}
                  className={inputStyles}
                  required
                  disabled={disabled}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-xxs py-10">
            <span>Are you legally authorized to work in the US on a fulltime basis for any employer?</span>
            <div className='flex items-center gap-s'>
              <SwitchButton
                toggled={!!formData.workAuthorized}
                fieldName='workAuthorized'
                label={PREFERENCE_ITEMS.workAuthorized}
                onToggle={handleInputChange}
                disabled={disabled}
              />
              <span className='text-md font-semibold'>{formData.workAuthorized ? 'Yes' : 'No'}</span>
            </div>
          </div>
          <FormInput
            type='single-select'
            name='referredBy'
            label={`How did you hear about the Talent inTulsa network?`}
            value={formData.referredBy}
            onChange={handleReferralChoice}
            required={true}
            choices={referralChoices}
            disabled={disabled}
          />
          { renderCommunity(referralChoice, formData, handleCommunityChoice, communityChoices) }
          { isSourceUserTable !== 'Candidate' && (
            <div className='vw-1280:flex flex-col'>
              <h3 className='text-xl'>Equal Opportunity Employer Voluntary Self-Identification Form</h3>
              <div className='vw-1280:flex gap-12'>
                <label
                  htmlFor='gender'
                  className={labelStyles}
                >
                  <p className={labelTextStyles}>Voluntary Self-ID of Gender</p>
                  <Dropdown
                    name='gender'
                    choices={ genderChoices }
                    currentChosen={ formData.gender }
                    handleChange={ handleInputChange }
                    inputStyles={ inputStyles }
                    disabled={ disabled }
                  />
                </label>
              </div>
              <div className='vw-1280:flex gap-12'>
                <label
                  htmlFor='ethnicity'
                  className={labelStyles}
                >
                  <p className={labelTextStyles}>Voluntary Self-ID of Ethnicity and Race</p>
                  <Dropdown
                    name='ethnicity'
                    choices={ ethnicityChoices }
                    currentChosen={ formData.ethnicity }
                    handleChange={ handleInputChange }
                    inputStyles={ inputStyles }
                    disabled={ disabled }
                  />
                </label>
              </div>

              <div className='vw-1280:flex gap-12'>
                <label
                  htmlFor='ethnicity'
                  className={labelStyles}
                >
                  <p className={labelTextStyles}>Voluntary Self-ID of Veteran Status</p>
                  <Dropdown
                    name='veteran'
                    choices={ veteranStatusChoices }
                    currentChosen={ formData.veteran }
                    handleChange={ handleInputChange }
                    inputStyles={ inputStyles }
                    disabled={ disabled }
                  />
                </label>
              </div>
            </div>
          )}
        </div>
        {editMode && <div className='w-full flex justify-end gap-l mt-16'>
          <button 
            onClick={() => setEditMode(false)} 
            className='bg-white text-blue-500 border-blue-500 border-1.5 text-lg  rounded-md px-4 py-2'>Cancel</button>
          <button 
            className='bg-blue-500 text-white text-lg rounded-md px-4 py-2 flex justify-center items-center'
            onClick={submitData}
          >
            <span>Save</span>
          </button>
        </div>}
      </form>
    </div>
  )
}

PersonalInfo.propTypes = {
  role: PropTypes.string.isRequired,
  candidateData: PropTypes.object.isRequired,
  handleCandidateUpdate: PropTypes.func.isRequired,
}

function renderCommunity (referralChoice, commObj, handleCommunityChoice, communityChoices) {

  if( referralChoice ) {
    return (<>
      <FormInput
        type='single-select'
        name='community'
        label='Which Community Partner?'
        value={commObj.community}
        onChange={handleCommunityChoice}
        choices={communityChoices}
      />
    </>)
  }
  return
