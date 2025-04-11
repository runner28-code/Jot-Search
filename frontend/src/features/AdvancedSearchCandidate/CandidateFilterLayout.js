import PropTypes from 'prop-types';
import { renderDropdownFilters, renderCheckboxFilters } from '../Filters';
import FilterSearch from '../../components/FilterSearch';
import AuthService from '../../services/auth';

const dropdownFiltersCoord = [
  'Category',
  'Experience',
  'Remote Availability',
  'Employment Type',
  'Status'
];

const dropdownFilters = [
  'Category',
  'Experience',
  'Remote Availability',
  'Employment Type',
];
const checkboxFiltersCoord = [
  'Open to Relocation',
  'Authorized to work in the US',
];
const checkboxFilters = [
  'Authorized to work in the US',
  'Open to Relocation',
  'Actively Looking',
];

export default function CandidateFilterLayout(props) {
  const {
    filterObject,
    handleFilterChange,
    searchTerm,
    setSearchTerm,
    handleSearchClick,
    clearFilters,
  } = props;
  let userRole = AuthService.getUserRole();

  const dropdownFilterObject = {};
  const checkboxFilterObject = {};
  if( userRole === 'coordinator' ) {
    dropdownFiltersCoord.forEach(filter => {
      dropdownFilterObject[filter] = filterObject[filter];
    });
    checkboxFiltersCoord.forEach(filter => {
      checkboxFilterObject[filter] = filterObject[filter];
    });
  } else {
    dropdownFilters.forEach(filter => {
      dropdownFilterObject[filter] = filterObject[filter];
    });
    checkboxFilters.forEach(filter => {
      checkboxFilterObject[filter] = filterObject[filter];
    });
  }


  return (
    <div className='flex flex-col gap-xxl-4'>
      <div className='flex flex-wrap gap-xxl-4'>
        { renderDropdownFilters(defaultFilterObject, dropdownFilterObject, handleFilterChange) }
      </div>
      <div className='flex flex-wrap gap-xxl-4'>
        { renderCheckboxFilters(defaultFilterObject, checkboxFilterObject, handleFilterChange) }
      </div>
      <div className='flex justify-between items-center gap-[65px]'>
        <FilterSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchClick={handleSearchClick}
          placeholder='Search Candidates'
          additionalClasses='w-1/2'
        />
        <button
          className='text-royalBlue text-sm whitespace-nowrap'
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>
    </div>
  );
