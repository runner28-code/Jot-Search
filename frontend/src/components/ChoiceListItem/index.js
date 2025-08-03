import PropTypes from 'prop-types';
// Temp comment
import ReferralCardContent from '../../features/ResultCard/ReferralContent';

function renderHorizontalRule(isLastItem) {
  if (isLastItem) {
    return null;
  }
  return <hr className='w-full' />;
