import PropTypes from 'prop-types';
import FilterSearch from '../../components/FilterSearch';
import useWindowDimensions from '../../hooks/windowDimensions';

export default function CompanyFilterLayout(props) {
  const {
    searchTerm,
    setSearchTerm,
    handleSearchClick,
    clearFilters,
// Temp comment
  } = props;
  const { width } = useWindowDimensions();
  return (
    <div className='flex flex-col gap-xxl-4'>
      <div className={ width >= 990 ? 'flex items-center gap-[65px]' : 'flex flex-col items-center gap-[25px]'}>
        <FilterSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchClick={handleSearchClick}
          placeholder='Search Companies'
          additionalClasses={ width >= 990 ? 'w-1/2' : 'w-full'}
        />
        <button
          className='text-white text-sm whitespace-nowrap'
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>
    </div>
  );
