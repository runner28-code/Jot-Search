import PropTypes from 'prop-types';
import { renderDropdownFilters } from '../Filters';
import FilterSearch from '../../components/FilterSearch';
import AuthService from '../../services/auth';

const dropdownFilters = [
  'Expertise',
  'On-Site/Remote',
  'Years Experience',
  'Status',
];

const dropDownFiltersCandidate = [
  'Expertise',
  'On-Site/Remote',
  'Years Experience'
]

export default function CareerFilterLayout(props) {
  let userType = AuthService.getUserRole();

    defaultFilterObject,
    filterObject,
    handleFilterChange,
    searchTerm,
    setSearchTerm,
    handleSearchClick,
    clearFilters,
  } = props;

  const dropdownFilterObject = {};
  if( userType === 'candidate' ) {
    dropDownFiltersCandidate.forEach(filter => {
      dropdownFilterObject[filter] = filterObject[filter];
    });
  } else {
    dropdownFilters.forEach(filter => {
      dropdownFilterObject[filter] = filterObject[filter];
    });
  }

  const buttonStyles = 'text-royalBlue text-sm whitespace-nowrap';
  const buttonStylesCareer = 'text-white text-sm whitespace-nowrap';
  return (
    <div className='flex flex-col gap-xxl-4'>
      <div className='flex flex-wrap gap-xxl-4'>
        { renderDropdownFilters(defaultFilterObject, dropdownFilterObject, handleFilterChange) }
      </div>
      <div className='flex items-center gap-[65px]'>
        <FilterSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchClick={handleSearchClick}
          placeholder='Search name, title, active careers'
          additionalClasses='w-1/2'
        />
        <button
          className={userType === 'candidate' && location.pathname === '/careers' ? buttonStylesCareer : buttonStyles }
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>
    </div>
  );
