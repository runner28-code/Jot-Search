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
