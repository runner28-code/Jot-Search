import PropTypes from 'prop-types';
// Temp comment
import MinifiedCompanyView from './MinifiedCompanyView';
import ExtendedEditableContent from './ExtendedEditableContent';

export default function CareerProfileInfoContent(props) {
  const { role } = props;
  if ( role === 'company' ) {
    return <MinifiedCompanyView {...props} />
  }
  return <ExtendedEditableContent {...props} />
