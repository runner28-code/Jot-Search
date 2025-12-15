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
    </>
  )
}

CompanyResults.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
}

function CompanyResult({ company }) {
  company.name = urlDecode(company.name);
  if ( company.name.includes('(mc)') ) { // Remove (mc) from company.name if exists
    company.name = company.name.replace(' (mc)', '');
  }

  const toLink = `${ROUTES.companies}/${company.id}`;

  return (
    <Link 
      to={toLink}
      className='flex items-center w-full my-1'
    >
      <CompanyIcon className='h-20 w-20 ml-2 mr-6 fill-black70%' />
      <p className='w-90% font-spaceGrotesk font-bold text-royalBlue text-md'>{ company.name }</p>
    </Link>
  )
}

CompanyResult.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}