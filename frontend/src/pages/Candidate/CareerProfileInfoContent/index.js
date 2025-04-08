import PropTypes from 'prop-types';
import MinifiedCompanyView from './MinifiedCompanyView';
// Temp comment
import ExtendedEditableContent from './ExtendedEditableContent';

export default function CareerProfileInfoContent(props) {
  const { role } = props;
  if ( role === 'company' ) {
    return <MinifiedCompanyView {...props} />
  }
  return <ExtendedEditableContent {...props} />
