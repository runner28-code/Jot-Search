import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsBuilding as CompanyIcon } from 'react-icons/bs';
import urlDecode from '../../utils/urlDecode';
import * as ROUTES from '../../routes';

export default function CompanyResults({ companies }) {
  if (companies.length === 0) {
    return null;
  }

  return (
    <>
      <h6 className='text-lg w-full text-black50% font-bold font-spaceGrotesk'>Companies</h6>
      { companies.map(company => {
        return (
          <CompanyResult 
            company={company} 
            key={company.id} />
        )
      })}
      <hr className='w-full border-black50% mt-6 mb-2' />
  )
