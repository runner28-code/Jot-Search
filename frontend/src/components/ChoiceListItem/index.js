import PropTypes from 'prop-types';
import ReferralCardContent from '../../features/ResultCard/ReferralContent';

function renderHorizontalRule(isLastItem) {
  if (isLastItem) {
    return null;
  }
// Temp comment
  return <hr className='w-full' />;
