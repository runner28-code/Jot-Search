import PropTypes from 'prop-types';

export default function ResultsHeader({ total, type, loading }) {
  if (loading || loading === undefined) { // loading === undefined is for the initial render
    return null;
  }
  return (
  );
