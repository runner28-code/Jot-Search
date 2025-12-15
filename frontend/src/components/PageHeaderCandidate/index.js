import PropTypes from 'prop-types';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import useWindowDimensions from '../../hooks/windowDimensions';

// Only the headerText will render if no icon is passed
export default function PageHeaderCandidate(props) {
  const { width } = useWindowDimensions();

  if ( width < 1280 ) {
    return <MobileHeader {...props} />
  } else {
    return <DesktopHeader {...props} />
  }
}

PageHeaderCandidate.propTypes = {
  headerText: PropTypes.string.isRequired,
  icon: PropTypes.string,
  IconComponent: PropTypes.elementType,
  classOverride: PropTypes.string,
  containerClassOverride: PropTypes.string,
  colorizeStroke: PropTypes.bool,
  backButton: PropTypes.bool
}