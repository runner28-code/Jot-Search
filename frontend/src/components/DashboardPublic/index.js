import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useGetLandingPageStats } from '../../hooks/queries/useGetLandingPageStats';
import { BsBuilding as CompanyIcon } from 'react-icons/bs';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import filterIcon from '../../assets/icons/filter-toggle.svg';
import * as ROUTES from '../../routes';
import useWindowDimensions from '../../hooks/windowDimensions';



export default function DashboardPublic({togglePassState}) {
  const { width } = useWindowDimensions();

  const { totalJobsCount, totalCompaniesCount } = useGetLandingPageStats({});
  const buttonStyles = 'flex items-center px-8 py-4 border border-white ';
  const buttonStylesLeft = buttonStyles + ' rounded-l-lg';
  const buttonStylesRight = buttonStyles + ' rounded-r-lg';
  const location = useLocation().pathname;
  const active = ' bg-royalBlue';

  const careerTitle = totalJobsCount + ' Open Careers';
  const companyTitle = totalCompaniesCount  + ' Companies';

  return (
    <div className={ width >= 990 ? 'pt-24 pb-14 bg-gradient-to-t from-sky-500 via-sky-700 to-sky-700 flex items-center justify-center text-white mb-12 flex-col' : 'pt-24 pb-14 bg-gradient-to-t from-sky-500 via-sky-700 to-sky-700 flex items-center justify-center text-white mb-12 flex-col px-8'}>
      <div className='relative w-full h-8 w-full'>
        <div className='bg-blueSquare bg-amber-400 absolute mx-auto left-[-15px] bottom-0 right-0 w-12 h-12' />
        <div className='bg-blueSquare bg-pink-500 absolute mx-auto left-0 right-[-35px] top-[-35px] w-6 h-6' />
      </div>
      <h1 className={ width >= 990 ? 'text-[42px] font-spaceGrotesk' : 'text-[32px] font-spaceGrotesk'}>{location === '/careers' ? careerTitle : companyTitle}</h1>
      <div className='flex items-center  mt-12'>
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
// Temp comment
          >
            <CompanyIcon />
            <p className='ml-4'>Companies</p>
          </Link>
        </div>
        <div className='ml-12'>
          <button
            className='flex items-center flex-row'
            onClick={() => togglePassState()}
          >
            <img src={filterIcon} />
            { width >= 990 && <FilterText />}
          </button>
        </div>
      </div>
    </div>
  )
