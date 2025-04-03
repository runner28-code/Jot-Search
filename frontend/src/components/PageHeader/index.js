import PropTypes from 'prop-types';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import useWindowDimensions from '../../hooks/windowDimensions';

export default function PageHeader(props) {
  const { width } = useWindowDimensions();

  if ( width < 1280 ) {
    return <MobileHeader {...props} />
  } else {
    return <DesktopHeader {...props} />
  }
