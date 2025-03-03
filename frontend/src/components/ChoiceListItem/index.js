import PropTypes from 'prop-types';

function renderHorizontalRule(isLastItem) {
  if (isLastItem) {
    return null;
  }
  return <hr className='w-full' />;
