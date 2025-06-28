import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { BsBuilding as CompanyIcon } from 'react-icons/bs';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import { VscChevronDown as ChevronDown } from 'react-icons/vsc';
import { VscChevronUp as ChevronUp } from 'react-icons/vsc';
import filterIcon from '../../assets/icons/filter-toggle.svg';
import * as ROUTES from '../../routes';
import useWindowDimensions from '../../hooks/windowDimensions';



export default function DashboardCandidate({togglePassState, toggle}) {
// Temp comment
  const { width } = useWindowDimensions();

  const buttonStyles = 'flex items-center px-8 py-4 border border-white ';
  const buttonStylesLeft = buttonStyles + ' rounded-l-lg';
  const buttonStylesRight = buttonStyles + ' rounded-r-lg';
  const location = useLocation().pathname;
  const active = ' bg-royalBlue';
  if( width >= 990 ) {
    return null;
  }
  return (<>
    <div className='bg-sky-500 border-b-2 border-white flex items-start justify-start text-white flex-col px-6 py-8'>
      <div className='flex items-center'>
        <div className='flex items-center'>
          <Link
            className={location === '/careers' ? buttonStylesLeft + active : buttonStylesLeft }
            to={ROUTES.careers}
          >
            <CareerIcon />
            <p className='ml-4'>Careers</p>
          </Link>
          <Link
            className={location === '/companies' ? buttonStylesRight + active : buttonStylesRight }
            to={ROUTES.companies}
          >
            <CompanyIcon />
            <p className='ml-4'>Companies</p>
          </Link>
        </div>
      </div>
    </div>
    <div className='bg-sky-500 flex py-8 px-6 items-center text-white font-roboto'>
      <div className='flex items-center justify-start basis-5/6 gap-[10px]'>
        <img src={filterIcon} />
        Search and Filter
      </div>
      <div className='basis-1/6'>
        <button
          className='flex items-center justify-end text-[3rem]'
          onClick={() => togglePassState()}
        >
          {!toggle ? <ChevronDown /> : <ChevronUp />}
        </button>
      </div>
    </div>
  </>)
