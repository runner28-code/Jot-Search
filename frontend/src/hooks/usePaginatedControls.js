import { MoreEllipsis } from '../components/Pagination/MoreEllipsis';
import { PaginationButton } from '../components/Pagination/PaginationButton';
import { PaginationCounts } from '../components/Pagination/PaginationCounts';
import { usePagination } from './usePagination'

export const usePaginatedControls = ({ total, page, setPage, itemsPerPage, isLoading, prefetchFunc }) => {
  const { totalPages, nextPage, prevPage, startCount, endCount } = usePagination({ total, itemsPerPage, page, setPage })

  const navStyles = 'flex flex-col space-y-4 items-center justify-center py-6 max-w-400';

  const PaginatedControls = () => total && total > itemsPerPage && (
    <nav 
      className={navStyles} 
      aria-label="Pagination"
    >
      <div className="flex-1 flex justify-end">
        {total !== 0 && 
          <PaginationButton
            page={page - 1}
            disabled={page === 1}
            prefetchFunc={prefetchFunc}
            setPage={prevPage}
          >
            {'<'}
          </PaginationButton>
        }
        {totalPages <= 5 ? (
          Array(totalPages).fill().map((_, index) => {
            const pageNumber = index + 1
            return (
              <PaginationButton
                key={pageNumber}
                page={pageNumber}
                setPage={setPage}
                prefetchFunc={pageNumber !== page && prefetchFunc}
                active={pageNumber === page}
              >
                {pageNumber}
              </PaginationButton>
            )})) : (
          <>
            <PaginationButton
              key={1}
              active={page === 1}
              setPage={setPage}
              page={1}
              prefetchFunc={prefetchFunc}
              {1}
            </PaginationButton>

            {page > 3 && (
              <MoreEllipsis />
            )}

            {page > 2 && (
              <PaginationButton
                key={page - 1}
                page={page - 1}
                setPage={setPage}
                prefetchFunc={prefetchFunc}
              >
                {page - 1}
              </PaginationButton>
            )}

            {page !== 1 && page !== totalPages && <PaginationButton
              key={page}
              page={page}
              active={true}
              setPage={setPage}
            >
              {page}
            </PaginationButton>
            }

            {page < totalPages - 1 && (
              <PaginationButton
                key={page + 1}
                page={page + 1}
                setPage={setPage}
                prefetchFunc={prefetchFunc}
              >
                {page + 1}
              </PaginationButton>
            )}

            {page < totalPages - 2 && (
              <MoreEllipsis />
            )}

            <PaginationButton
              key={totalPages}
              active={page === totalPages}
              page={totalPages}
              setPage={setPage}
              prefetchFunc={prefetchFunc}
            >
              {totalPages}
            </PaginationButton>
          </>   
                
        ) 
        }
        {total !== 0 && <PaginationButton
          disabled={page === totalPages}
          page={page + 1}
          setPage={nextPage}
          prefetchFunc={prefetchFunc}
        >
          {'>'}
        </PaginationButton>}
      </div>
      {!isLoading && <PaginationCounts 
        startCount={startCount} 
        endCount={endCount} 
        total={total}             
      />
      }
    </nav>
  )

  return {
    PaginatedControls,
    page,
    setPage,
  }
