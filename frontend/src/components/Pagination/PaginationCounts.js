import PropTypes from 'prop-types';

export const PaginationCounts = ({ startCount, endCount, total }) => {
  return (
    <div>
      <p className="text-sm">
        <span className="font-medium">{endCount}</span> of{' '}
        <span className="font-medium">{total}</span> results
      </p>
    </div>
  )
