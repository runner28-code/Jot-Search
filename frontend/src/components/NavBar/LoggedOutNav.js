import { Link } from 'react-router-dom';
import inTulsaLogoText from '../../assets/images/intulsa-talent-careers.svg';
import linkedin_grey from '../../assets/images/social_linkedin_grey.svg';
import GlobalSearch from '../GlobalSearch';
import NavMenu from '../NavMenu';
import { HiOutlineExternalLink } from 'react-icons/hi';
import AuthService from '../../services/auth';
import NavSearch from '../NavSearch';
import NavSearchMobile from '../NavSearchMobile';
import * as ROUTES from '../../routes';
import useWindowDimensions from '../../hooks/windowDimensions';

export default function NavBar() {
  const { width } = useWindowDimensions();

  if ( width < 1280 ) {
    return <MobileNavBarLayout />
  } else {
    return <DesktopNavBarLayout />
  }
}

function MobileNavBarLayout() {
  const { width } = useWindowDimensions();
  return (
    <nav className='shadow-md bg-white fixed top-0 left-0 right-0 z-50'>
      <div className='h-30 pl-4 pr-4 flex justify-between items-center relative'>
        <Link to={ROUTES.root}>
          <img
            src={inTulsaLogoText}
            alt='logo'
            className='w-72 h-ful'
          />
        </Link>
        {/* Nav Menu */}
        <div className='flex items-center'>
          { width >= 990 ? <NavSearch /> : <NavSearchMobile />}
          <NavMenu />
        </div>
      </div>
      {/* Global Search */}
      <div className='flex justify-center'>
        { renderGlobalSearch() }
      </div>
    </nav>
  )
}

function DesktopNavBarLayout() {
  return (
    <nav className='h-44 pl-14 pr-10 flex justify-between items-center shadow-md bg-white fixed top-0 left-0 right-0 z-50 '>
      {/* Logo */}
      <Link to={ROUTES.root}>
        <img
          src={inTulsaLogoText}
          alt='logo'
        />
      </Link>
      {/* Nav Menu */}
      <div className='flex items-center font-spaceGrotesk'>
        <Link to={ROUTES.careers}>
          <span className='text-ml text-black70% mx-4 vw-1350:mx-8 vw-1440:mx-12'>Find Careers</span>
        </Link>
        <Link to={ROUTES.companies}>
          <span className='text-ml text-black70% mx-4 vw-1350:mx-8 vw-1440:mx-12'>Browse Companies</span>
        </Link>
        <a
          href={ROUTES.intulsa}
          className='flex items-center mx-4 vw-1350:mx-8 vw-1440:mx-12'
        >
          <span className='text-ml text-black70%'>Our Website</span>
          <HiOutlineExternalLink className='stroke-smokeGray h-7 w-7 ml-3' />
        </a>
        <Link
          to={ROUTES.login}
          className='ml-4 vw-1350:ml-8 mr-4'
        >
          <button className='border-royalBlue border-1.5 border-solid rounded-md px-7 py-4'>
            <span className='text-royalBlue'>Login</span>
          </button>
        </Link>
        <Link
          to={ROUTES.signup}
          className='ml-4 mr-6'
        >
          <button className='bg-royalBlue rounded-md px-9 py-4'>
            <span className='text-white'>Create Account</span>
          </button>
        </Link>
        <a href={ROUTES.linkedin}>
            src={linkedin_grey}
            className='text-royalBlue h-14'
            alt='linkedin'
          />
        </a>
      </div>
    </nav>
  )
