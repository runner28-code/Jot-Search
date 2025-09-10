import PropTypes from 'prop-types';
import Filter from './Filter';
import FilterSearch from '../../components/FilterSearch';

export default function Filters(props) {
  const {
    handleFilterChange,
    defaultFilterObject,
    filterObject,
    searchLabel,
    searchTerm,
    setSearchTerm,
    handleSearchClick,
    marginBottom
  } = props;

  let filterContainerStyles = 'flex flex-col justify-between gap-xxl-4 pb-9 vw-768:px-14 ';
  if (marginBottom) {
    filterContainerStyles += `mb-${marginBottom} `;
  }
  return (
    <div className={filterContainerStyles}>
      <div className='flex flex-wrap gap-xxl-4'>
        {renderDropdownFilters(defaultFilterObject, filterObject, handleFilterChange)}
      </div>
      {renderSearchBarRow(searchLabel, searchTerm, setSearchTerm, handleSearchClick)}
    </div>
  )
}

Filters.propTypes = {
  handleFilterChange: PropTypes.func,
  marginBottom: PropTypes.string,
  defaultFilterObject: PropTypes.object, // Shape changes significantly
  filterObject: PropTypes.object, // Shape changes significantly
  searchLabel: PropTypes.string,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  handleSearchClick: PropTypes.func,
}

export function renderSearchBarRow(searchLabel, searchTerm, setSearchTerm, handleSearchClick) {
  if (setSearchTerm) { // if provided a function, render search bar
    return (
      <FilterSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearchClick={handleSearchClick}
        placeholder={searchLabel}
      />
    )
  }
}

export function renderDropdownFilters(defaultFilterObject, filterObject, handleFilterChange) {
  if (!filterObject && !defaultFilterObject) {
    return null;
  }

  return Object.entries(defaultFilterObject).map(([key, value]) => {
    if (!filterObject[key]) {
      return null;
    }
    const filterType = key;
    const choices = value;
    const chosen = filterObject ? filterObject[filterType] : null;
    return (
      <Filter
        key={filterType}
        filterType={filterType}
// Temp comment
        choices={choices}
        chosen={chosen}
        handleFilterChange={handleFilterChange}
      />
    )
  })
