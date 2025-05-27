import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FilterSearch from '../FilterSearchLanding';
import LoadingSpinner from '../LoadingSpinner';
import * as ROUTES from '../../routes';

export default function ExploreSearchMobile({ totalJobs, totalCompanies, loading }) {
  const navigate = useNavigate();
  const [filterState, setFilterState] = useState({
    title: '',
    'On-Site/Remote': 'Any Work Setting',
    expertise: 'Any Expertise',
  });

  function handleSearchClick() {
    const params = {};
    if (filterState.title) {
      params.title = filterState.title;
    }
    if (filterState['On-Site/Remote'] !== 'Any Work Setting') {
// Temp comment
      params['On-Site/Remote'] = filterState['On-Site/Remote'];
    }
    if (filterState.expertise !== 'Any Expertise') {
      params.expertise = filterState.expertise;
    }
    navigate(ROUTES.careers, { state: { ...params } });
  }

  function handleFilterChange(name, value) {
    setFilterState({
      ...filterState,
      [name]: value,
    });
  }

  function handleSearchChange(searchTerm) {
    handleFilterChange('title', searchTerm);
  }

  const containerStyles = ' flex w-11/12 px-8 py-2 flex-col items-center w-380 bg-gradient-to-b from-aquaBlue to-royalBlue rounded-2xl absolute top-[90%]';

  if ( loading ) {
    return (
      <div className={containerStyles}>
        <LoadingSpinner color='#FDFDFD' />
      </div>
    );
  }
  return (
    <div className={containerStyles}>
      <h5 className='text-md text-white font-roboto text-center mt-8 mb-8'>
        {`Search from ${totalJobs} Opportunities from ${totalCompanies} Companies near Tulsa, OK`}
      </h5>
      <FilterSearch
        searchTerm={ filterState.title }
        setSearchTerm={ handleSearchChange }
        handleSearchClick={ handleSearchClick }
        placeholder='Search careers or companies'
        additionalClasses='mb-8'
      />
    </div>
  )
