import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../routes';
import { BsBuilding as CompanyIcon } from 'react-icons/bs';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import { VscChevronLeft as LeftIcon } from 'react-icons/vsc';
import useWindowDimensions from '../../hooks/windowDimensions';

export default function DashboardPublicMin({type}) {
  const navigate = useNavigate();

  const buttonStyles = 'flex items-center px-8 py-4 border border-white ';
  const buttonStylesLeft = buttonStyles + ' rounded-l-lg';
  const buttonStylesRight = buttonStyles + ' rounded-r-lg';
  const active = ' bg-royalBlue';
  const { width } = useWindowDimensions();

  if( width <= 990 ) {
    return(
      <div className='py-8 bg-gradient-to-t from-sky-500 via-sky-700 to-sky-700 flex items-center justify-center text-white mb-12 flex-col px-[5%]'>
        <div className='flex items-center justify-start w-full'>
          <div className='flex items-center text-lg'>
            <LeftIcon />
            <button
              className='text-white underline'
              onClick={() => navigate(-1)}
            >
            Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return(
    <div className='py-8 bg-gradient-to-t from-sky-500 via-sky-700 to-sky-700 flex items-center justify-center text-white mb-12 flex-col px-[15%]'>
      <div className='flex items-center justify-between w-full'>
        <div className='basis-1/12'>
          <button
            className='text-white underline text-lg'
            onClick={() => navigate(-1)}
          >
          Back
          </button>
        </div>
        <div className='flex items-center basis-11/12 justify-center'>
          <Link
            className={type === 'careers' ? buttonStylesLeft + active : buttonStylesLeft }
            to={ROUTES.careers}
          >
            <CareerIcon />
            <p className='ml-4'>Careers</p>
          <Link
            className={type === 'company' ? buttonStylesRight + active : buttonStylesRight }
            to={ROUTES.companies}
          >
            <CompanyIcon />
            <p className='ml-4'>Companies</p>
          </Link>
        </div>
      </div>
    </div>
  )
