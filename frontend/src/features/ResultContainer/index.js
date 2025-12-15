import PropTypes from 'prop-types';
import CandidateCard from '../ResultCard/CandidateCard';
import CompactCareerCard from '../ResultCard/CompactCareerCard';
import CareerCard from '../ResultCard/CareerCard';
import CompanyCard from '../ResultCard/CompanyCard';
import ViewAllLink from '../../components/ViewAllLink';
import { pluralizedTypes } from '../../utils/constants';
import LoadingSpinner from '../../components/LoadingSpinner';
import CompactCompanyCard from '../ResultCard/CompactCompanyCard';

export default function ResultContainer(props) {
  const {
    results,
    loading,
    type,
    limit,
    header, 
    active,
    compact = false,
    isFavoriteOverride = null,
    agoText = null,
    containerClass = undefined,
    selectableProps = null,
  } = props;
  const resultsHeaderStyles = 'font-bold w-full text-xl mb-8 ';
  const baseStyles = 'w-full max-w-400 py-5'
  const resultsContainerStyles = containerClass || 'flex flex-col items-center justify-center ';

  function renderHeader() {
    if ( !header ) {
      return null;
    }

    return <h5 className={resultsHeaderStyles}>{header}</h5>;
  }

  function renderFooter() {
    if ( !limit ) {
      return null;
    }

    let pluralizedType = pluralizedTypes[type];
    const capitalizedType = pluralizedType.charAt(0).toUpperCase() + pluralizedType.slice(1);

    return <ViewAllLink
      href={`/${pluralizedType}`}
      text={`View All ${capitalizedType}`}
    />;
  }

  return (
    <div className='w-full'>
      { renderHeader() }
      <div
        className={`${baseStyles} ${resultsContainerStyles}`}>
        { renderResults(results, loading, type, active, compact, isFavoriteOverride, agoText, selectableProps) }
      </div>
      { renderFooter() }
    </div>
  )
}

ResultContainer.defaultProps = {
  results: []
}

ResultContainer.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  limit: PropTypes.number,
  active: PropTypes.bool,
  header: PropTypes.string,
  compact: PropTypes.bool,
  containerClass: PropTypes.string,
  isFavoriteOverride: PropTypes.bool,
  agoText: PropTypes.string,
  selectableProps: PropTypes.shape({
    selectable: PropTypes.bool,
    selected: PropTypes.arrayOf(PropTypes.string),
    handleClick: PropTypes.func
  })
}

function renderResults(results, loading, type, active, compact = false, isFavoriteOverride = null, agoText = null, selectableProps = null) {
  if ( loading ) {
    return <div className='h-200'>
      <LoadingSpinner />
    </div>;
  }

  if ( !results || !results.length ) {
    return <p className='text-center text-lightGrey'>No results found</p>;
  }

  switch (type) {
    case 'candidates':
      return results.map((result, index) =>
        <CandidateCard
          key={result.id}
          type={type}
          data={result}
          index={index}
        />
      )
    case 'companies':
      return results.map((result, index) => {
        return compact ?
          <CompactCompanyCard
            key={result.id}
            type={type}
            data={result}
            index={index}
            agoDate={result.agoDate}
            active={active}
            isFavoriteOverride={isFavoriteOverride}
            agoText={agoText}
            selectableProps={selectableProps}
          /> :
          <CompanyCard
            key={result.id}
            type={type}
            data={result}
            index={index}
          />
      }

      )
    case 'jobs':
    default:
      return results.map((result, index) => {
        return compact ?
          <CompactCareerCard
            key={result.id}
            type={type}
            data={result}
            index={index}
            active={active}
            agoDate={result.createdAt}
            isFavoriteOverride={isFavoriteOverride}
            agoText={agoText}
            selectableProps={selectableProps}
          /> :
          <CareerCard
            key={result.id}
            type={type}
            data={result}
            index={index}
            active={active}
          />
      }
      )
  }
}
