
export const PaginationCounts = ({ startCount, endCount, total }) => {
  return (
    <div>
      <p className="text-sm">
            Showing <span className="font-medium">{total === 0 ? 0 : startCount}</span> to{' '}
        <span className="font-medium">{endCount}</span> of{' '}
        <span className="font-medium">{total}</span> results
      </p>
    </div>
  )
