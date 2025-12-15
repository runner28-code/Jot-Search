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
  }

  const [formType, setFormType] = useState('Candidate');
  function handleDropdownChange(e) {
    setFormType(e.target.value);
  }

  const defaultContainer = 'bg-white border-solid border-2 border-neutral-300 remove-outline rounded-3xl py-12';
  const companyContainer = '';

  return (<>
    <h2 className='text-lg vw-768:text-h2 text-royalBlue font-spaceGrotesk font-bold mb-16 text-center flex items-center'>
      <img
        src={User}
        alt='User Icon'
        className='w-12 h-12 vw-768:w-24 vw-768:h-24 mr-8'
      />
      <span>Add new</span>
      <Dropdown
        inputStyles='text-md vw-768:text-lg font-bold mx-4 px-2 py-4 ml-8 border-lightGrey border-solid border-2 rounded-2xl'
        name='formType'
        currentChosen={formType}
        choices={['Candidate', 'Company', 'Coordinator']}
        handleChange={handleDropdownChange}
        noDefault={true}
      />
    </h2>
    <div className={formType != 'Company' ? defaultContainer : companyContainer }>
      <div className='flex w-full px-8 vw-1280:px-0 3vw-1280:ml-10'>
        { renderFormByType(formType) }
      </div>
    </div>
  </>)
}

function renderFormByType(formType) {
  switch (formType) {
    case 'Candidate':
      return <AddCandidate loggedIn={true} />
    case 'Company':
      return <AddCompanyUser />
    case 'Coordinator':
      return <AddCoordinator />
    default:
      return <AddCandidate />
  }
}
