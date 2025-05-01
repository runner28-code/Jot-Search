import PropTypes from 'prop-types';
import { renderDropdownFilters, renderCheckboxFilters } from '../Filters';
import FilterSearch from '../../components/FilterSearch';
import AuthService from '../../services/auth';
import { skills } from '../../utils/skillHierarchyMap';
import FormInput from '../../components/FormInput';

const dropdownFiltersCoord = [
  'Category',
  'Experience',
  'Remote Availability',
  'Employment Type',
  'Status',
  'Skills'
];

const dropdownFilters = [
  'Category',
  'Experience',
  'Remote Availability',
  'Employment Type',
];
const checkboxFiltersCoord = [
  'Authorized to work in the US',
  'Open to Relocation',
  'Actively Looking'
];
const checkboxFilters = [
  'Authorized to work in the US',
  'Open to Relocation',
  'Actively Looking',
];

export default function CandidateFilterLayout(props) {
  const {
    defaultFilterObject,
    filterObject,
    handleFilterChange,
    searchTerm,
    setSearchTerm,
    handleSearchClick,
// Temp comment
    clearFilters,
  } = props;
  let userRole = AuthService.getUserRole();

  const dropdownFilterObject = {};
  const checkboxFilterObject = {};
  if (userRole === 'coordinator') {
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

  const toggleSkills = (skill) => {
    const skills = filterObject.skills ?? []
    if (skills.includes(skill)) {
      handleFilterChange('skills', skills.filter(s => s !== skill))
    } else {
      handleFilterChange('skills', [...skills, skill])
    }
  }
  console.log(filterObject)

  return (
    <div className='flex flex-col gap-xxl-4'>
      <div className='flex flex-wrap gap-xxl-4'>
        {renderDropdownFilters(defaultFilterObject, dropdownFilterObject, handleFilterChange)}
        <FormInput
          type='typeahead'
          dropdownType='tags'
          name='skills'
          label='Your skills (select at least 3)'
          placeholder='Select all that apply'
          required={true}
          value={filterObject.skills}
          onChange={toggleSkills}
          choices={skills}
        />
      </div>
      <div className='flex flex-wrap gap-xxl-4'>
        {renderCheckboxFilters(defaultFilterObject, checkboxFilterObject, handleFilterChange)}
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
