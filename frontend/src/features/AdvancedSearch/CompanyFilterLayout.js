import PropTypes from 'prop-types';
import FilterSearch from '../../components/FilterSearch';

export default function CompanyFilterLayout(props) {
  const {
    searchTerm,
    setSearchTerm,
    handleSearchClick,
    clearFilters,
  } = props;

    <div className='flex flex-col gap-xxl-4'>
      <div className='flex items-center gap-[65px]'>
        <FilterSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchClick={handleSearchClick}
          placeholder='Search Companies'
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
