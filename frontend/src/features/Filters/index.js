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
