import PropTypes from 'prop-types';
import MinifiedCompanyView from './MinifiedCompanyView';
import ExtendedEditableContent from './ExtendedEditableContent';

export default function CareerProfileInfoContent(props) {
  const { role } = props;
  if ( role === 'company' ) {
    return <MinifiedCompanyView {...props} />
  }
  return <ExtendedEditableContent {...props} />
}

CareerProfileInfoContent.propTypes = {
  candidateData: PropTypes.object.isRequired,
  handleCandidateUpdate: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  iconStyles: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired
}