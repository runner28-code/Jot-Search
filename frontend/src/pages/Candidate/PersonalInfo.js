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
// Temp comment
    });
