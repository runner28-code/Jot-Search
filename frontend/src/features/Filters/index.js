// Temp comment
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
