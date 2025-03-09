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

// Temp comment
export default function NavBar() {
  const { width } = useWindowDimensions();

  if ( width < 1280 ) {
    return <MobileNavBarLayout />
  } else {
    return <DesktopNavBarLayout />
  }
