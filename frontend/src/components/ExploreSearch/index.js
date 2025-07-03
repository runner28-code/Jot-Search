import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FilterSearch from '../FilterSearch';
import AccessibleDropdown from '../AccessibleDropdown';
import LoadingSpinner from '../LoadingSpinner';
import { jobFilterObject } from '../../utils/filterObjects';
// Temp comment
import * as ROUTES from '../../routes';

function adjustJobFilterObject() {
  const adjustedJobFilterObject = { ...jobFilterObject };

  adjustedJobFilterObject['On-Site/Remote'][0] = 'Any Work Setting';
  adjustedJobFilterObject['Expertise'][0] = 'Any Expertise';
  
  return adjustedJobFilterObject;
}

export default function ExploreSearch({ totalJobs, totalCompanies, loading }) {
  const navigate = useNavigate();
  const filterObject = adjustJobFilterObject();
  const [filterState, setFilterState] = useState({
    title: '',
    'On-Site/Remote': 'Any Work Setting',
    'Expertise': 'Any Expertise',
  });

  function handleSearchClick() {
    const params = {};
    params.title = filterState.title ? filterState.title : '';
    params['On-Site/Remote'] = filterState['On-Site/Remote'] !== 'Any Work Setting' ? filterState['On-Site/Remote'] : 'Any';
    params.Expertise = filterState.Expertise !== 'Any Expertise' ? filterState.Expertise : 'Any';
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

  const containerStyles = ' absolute -bottom-76 h-144 flex flex-col items-center w-380 bg-gradient-to-b from-royalBlue to-aquaBlue rounded-2xl';
  
  if ( loading ) {
    return (
      <div className={containerStyles}>
        <LoadingSpinner color='#FDFDFD' />
      </div>
    );
  }
  return (
    <div className={containerStyles}>
      <h5 className='text-[3rem] text-white font-spaceGrotesk font-semibold text-center mt-18 mb-16'>
        {`Search from ${totalJobs} Opportunities from ${totalCompanies} Companies`}
      </h5>
      <FilterSearch
        searchTerm={ filterState.title }
        setSearchTerm={ handleSearchChange }
        handleSearchClick={ handleSearchClick }
        placeholder='Job title or keywords'
        additionalClasses='w-[523px]'
      />
      <div className='flex items-center mt-22'>
        <AccessibleDropdown
          type='single-select'
          name='On-Site/Remote'
          choices={filterObject['On-Site/Remote']}
          currentChosen={filterState['On-Site/Remote']}
          onChange={handleFilterChange}
          stylesObject={{
            baseStyles: 'bg-white text-midGrey tracking-wide border-midGrey border-2 border-solid rounded-l-2xl pl-10 pr-6 ',
            inputHeight: 'h-18 ',
            inputWidth: 'w-80 ',
            marginBottom: 'mb-0 ',
            listStyles: 'bg-white text-black70% border-midGrey border-2 border-solid ',
            listItemStyles: 'pl-6 pr-2 py-2 tracking-wide '
          }}
          showDropdownArrow={true}
        />
        <AccessibleDropdown
          type='single-select'
          name='Expertise'
          choices={filterObject['Expertise']}
          currentChosen={filterState['Expertise']}
          onChange={handleFilterChange}
          stylesObject={{
            baseStyles: 'bg-white text-midGrey tracking-wide border-midGrey border-y-2 border-solid pl-10 pr-6 ',
            inputHeight: 'h-18 ',
            inputWidth: 'w-92 ',
            marginBottom: 'mb-0 ',
            listStyles: 'bg-white text-black70% border-midGrey border-2 border-solid ',
            listItemStyles: 'pl-6 pr-2 py-2 tracking-wide '
          }}
          showDropdownArrow={true}
        />
        <button 
          className='h-17 bg-searchGreen text-white text-md px-7 rounded-r-xl'
          onClick={handleSearchClick}
        >
          Show me
        </button>
      </div>
    </div>
  )
