import PropTypes from 'prop-types';
import { useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import CareerCard from '../ResultCard/CareerCard';
import { prefetchJobs, useGetJobs } from '../../hooks/queries/useGetJobs';
import { usePaginatedControls } from '../../hooks/usePaginatedControls';

const ITEMS_PER_PAGE = 5;

export default function OtherCareers({ companyId, companyName, currentCareerId }) {
  const [page, setPage] = useState(1);
  const filtersArr = [
    {
      key: 'status',
      value: ['Active', 'Open']
    },
    {
      key: 'companyId',
      value: companyId
    }
  ];

  const { careers, total, isLoading }= useGetJobs({ filtersArr, count: ITEMS_PER_PAGE, page});
  const prefetchFunc = (page) => {
    prefetchJobs({ filtersArr, count: ITEMS_PER_PAGE, page })
  }

  const { PaginatedControls } = usePaginatedControls({ total, page, setPage, itemsPerPage: ITEMS_PER_PAGE, isLoading, prefetchFunc });

  const matchingCareerFound = (careers && careers.length > 0) && careers.some(job => job.externalId === currentCareerId);
  const adjustedTotal = matchingCareerFound ? total - 1 : total || 0;
  const headerString = adjustedTotal + (companyName ? ` Other Careers open at ${companyName}` : ' Other open careers');

  return (<>
    {isLoading && <LoadingSpinner />}
    {!isLoading && <h4 className='text-h4 font-spaceGrotesk text-charcoal font-semibold mb-xxl-2'>{headerString}</h4>}
      <>  
        {careers.map((career, index) => {
          if (career.externalId === currentCareerId) { // Don't show the current career
            return null;
          }
          return <CareerCard
            key={index}
            data={career}
          />
        })
        }
        {/* Only show Pagination if total is greater than the amount we render on a single page */}
        { total > ITEMS_PER_PAGE && <PaginatedControls /> }
      </>
    )}
  </>)
