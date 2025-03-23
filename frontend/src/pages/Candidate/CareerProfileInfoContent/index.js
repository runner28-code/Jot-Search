import PropTypes from 'prop-types';
import MinifiedCompanyView from './MinifiedCompanyView';
import ExtendedEditableContent from './ExtendedEditableContent';

// Temp comment
export default function CareerProfileInfoContent(props) {
  const { role } = props;
  if ( role === 'company' ) {
    return <MinifiedCompanyView {...props} />
  }
  return <ExtendedEditableContent {...props} />
