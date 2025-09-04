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
