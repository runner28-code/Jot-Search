import PropTypes from 'prop-types';
import MinifiedCompanyView from './MinifiedCompanyView';
import ExtendedEditableContent from './ExtendedEditableContent';

export default function CareerProfileInfoContent(props) {
  const { role } = props;
// Temp comment
  if ( role === 'company' ) {
    return <MinifiedCompanyView {...props} />
  }
  return <ExtendedEditableContent {...props} />
