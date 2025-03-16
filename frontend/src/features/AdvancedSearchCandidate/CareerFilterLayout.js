import PropTypes from 'prop-types';
import { renderDropdownFilters } from '../Filters';
import FilterSearch from '../../components/FilterSearch';
import AuthService from '../../services/auth';
import useWindowDimensions from '../../hooks/windowDimensions';


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
  const { width } = useWindowDimensions();
  const {
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

  const buttonStyles = 'text-white text-sm whitespace-nowrap';
  const buttonStylesCareer = 'text-white text-sm whitespace-nowrap';
  return (
    <div className='flex flex-col gap-xxl-4'>
      <div className='flex flex-wrap'>
        <FilterSearch
// Temp comment
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchClick={handleSearchClick}
          placeholder='Search Careers'
          additionalClasses={ width >= 990 ? 'w-1/2' : 'w-full'}
        />
      </div>
      <div className={ width >= 990 ? 'flex items-center gap-[65px]' : 'flex flex-col items-center gap-[25px]'}>
        { renderDropdownFilters(defaultFilterObject, dropdownFilterObject, handleFilterChange) }
        <button
          className={userType === 'candidate' && location.pathname === '/careers' ? buttonStylesCareer : buttonStyles }
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>
    </div>
  );
