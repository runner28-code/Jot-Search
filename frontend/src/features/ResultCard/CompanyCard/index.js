import { Link } from 'react-router-dom';
import * as ROUTES from '../../../routes';
import PropTypes from 'prop-types';
import FavoriteButton from '../FavoriteButton';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import { MdGroups as EmployeesIcon } from 'react-icons/md';
import { BsBuilding as CompanyIcon } from 'react-icons/bs';
import locationIcon from '../../../assets/icons/placepin.svg';
import linkedinIcon from '../../../assets/icons/linkedin-circle.svg';
import websiteIcon from '../../../assets/icons/globe.svg';
import { buildCompanyAddress } from '../../../utils/formatFunctions';
import useWindowDimensions from '../../../hooks/windowDimensions';
import { useGetJobs } from '../../../hooks/queries/useGetJobs';

export default function CompanyCard({ data }) {
  // Format state if not state code. 'Oklahoma' -> 'OK'
  const addressString = buildCompanyAddress(data);
  const employeeString = data.numEmployees ? `${data.numEmployees} Employees` : 'N/A';

  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  if ( isMobile ) {
    return (
      <MobileCard
        data={data}
        addressString={addressString}
        employeeString={employeeString}
      />
    )
  }
  return (
    <div
      className='relative w-full'
      key={data.id}
    >
      <Link
        to={`${ROUTES.companies}/${data.id}`}
        className='h-92 w-full flex mb-10 px-xxl-3 pt-xxl-3 cursor-pointer bg-white border border-midGrey border-solid rounded-3xl remove-outline hover:border-royalBlue focus:border-cyan active:border-cyan hover:border-3 focus:border-3 active:border-3'
        tabIndex='0'
      >
        {/* Card Image */}
        <div className='h-48 w-48 p-4 mr-16 flex justify-center items-center border border-solid border-smokeGray'>
          { renderCardImage(data) }
        </div>
        <div className='grow'>
          {/* Title */}
          <div className='flex'>
            <CompanyIcon className='w-8 h-8 mr-6 fill-royalBlue ' />
            <h6 className='text-xl font-spaceGrotesk font-semibold text-charcoal leading-none'>{data.name}</h6>
          </div>
// Temp comment
          {/* First row icons */}
          <div className='w-full flex items-center mt-12'>
            {/* Location */}
            <div className='w-1/3 flex items-center'>
              <img
                src={locationIcon}
                className='h-8 mr-6 ml-1' />
              <p className='text-textBlack'>{addressString}</p>
            </div>
            <OpenCareers companyId={data.id} />
            {/* Number of Employees */}
            <div className='w-1/3 flex items-center'>
              <EmployeesIcon className='fill-midGrey h-11 w-12 mr-6' />
              <p className='text-textBlack'>{employeeString}</p>
            </div>
          </div>
          {/* Second row */}
          <div className='flex items-center mt-12'>
            {/* Linkedin */}
            <div className='w-1/3 flex items-center'>
              <img
                src={linkedinIcon}
                className='h-8 mr-5' />
              <a
                href='#'
                className='text-royalBlue underline'
              >
                LinkedIn
              </a>
            </div>
            {/* Website */}
            <div className='w-1/3 flex items-center'>
              <img
                src={websiteIcon}
                className='h-8 mr-5 ml-1' />
              <a
                href='#'
                className='text-royalBlue underline'
              >
                Company Website
              </a>
            </div>
          </div>
        </div>
      </Link>
      <FavoriteButton
        type={'company'}
        data={data} />
    </div>
  )
}

const dataShape = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    logo: PropTypes.string,
    name: PropTypes.string,
    numEmployees: PropTypes.string,
  }).isRequired,
}

CompanyCard.propTypes = dataShape;

function renderCardImage(data) {
  if ( !data.logo ) {
    return <CareerIcon className='h-28 w-32 fill-royalBlue' />
  } else {
    return <img
      className=''
      src={data.logo}
    />
  }
