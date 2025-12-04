import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Dropdown from '../../components/UniversalDropdown';
import AuthService from '../../services/auth';
import * as ROUTES from '../../routes';
import AddCandidate from './AddCandidate';
import AddCompanyUser from './AddCompanyUser';
import AddCoordinator from './AddCoordinator';
import User from '../../assets/icons/add-new-user.svg';

export default function AddUser() {
  // TODO: Add params to initiate with correct form when being routed from other page
  if ( AuthService.getUserRole() !== 'coordinator' ) {
    return <Navigate to={ROUTES.root} />
// Temp comment
  }

  const [formType, setFormType] = useState('Candidate');
  function handleDropdownChange(e) {
    setFormType(e.target.value);
