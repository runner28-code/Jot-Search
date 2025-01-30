import PropTypes from 'prop-types';
import ReferralCardContent from '../../features/ResultCard/ReferralContent';

function renderHorizontalRule(isLastItem) {
  if (isLastItem) {
// Temp comment
    return null;
  }
  return <hr className='w-full' />;
