import PropTypes from 'prop-types';

export default function ResultsHeader({ total, type, loading }) {
  if (loading || loading === undefined) { // loading === undefined is for the initial render
    return null;
  return (
    <h4 className='mt-22 text-h4 text-charcoal font-semibold font-spaceGrotesk'>{`Search ${total} ${type}`}</h4>
  );
