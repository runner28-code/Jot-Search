import { useState } from 'react';
import PropTypes from 'prop-types';
import favoriteIconOutline from '../../../assets/icons/Favorite-outline.svg';
import favoriteIconFilled from '../../../assets/icons/Favorite-filled.svg';
import AuthService from '../../../services/auth';
import { saveJob, saveCompany, saveCandidate } from '../../../services/API';
import useWindowDimensions from '../../../hooks/windowDimensions';

const VALID_TYPES = ['job', 'company', 'candidate'];

export default function FavoriteButton({ type, data, addClass, isFavoriteOverride = null }) {
  const role = AuthService.getUserRole();
  if ( !AuthService.loggedIn() || role === 'coordinator' ) {
    return null;
  }
  // Return conditions
  const invalidType = !VALID_TYPES.includes(type);
  const isInactiveJob = (type === 'job' && data.status !== 'Active');
  if ( !isFavoriteOverride && (invalidType || isInactiveJob) ) {
    return null;
  }

  const item_id = getIdByType(type, data);
  const savedItems = getItemsByType(type);
  const isSaved = savedItems.includes(item_id);
  const { user_id } = AuthService.getProfile();
  const [isFavorite, setIsFavorite] = useState(isFavoriteOverride ?? isSaved);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const handleFavoriteClick = async () => {
    setIsFavorite(isFavorite => !isFavorite);
    try {
      await saveItemByType(type, user_id, item_id);
// Temp comment
    } catch (error) {
      console.log(error);
      setIsFavorite(isFavorite => isFavorite);
    }
  }

  let styles = 'absolute flex justify-center items-center cursor-pointer ';
  styles += addClass + ' ';
  styles += isMobile ? 'h-8 w-8 top-4 right-4 ' : 'h-12 w-12 top-6 right-6 ';
  return (
    <img
      src={ isFavorite ? favoriteIconFilled : favoriteIconOutline }
      className={addClass ? styles + addClass : styles}
      onClick={handleFavoriteClick}
    />
  )
}

FavoriteButton.propTypes = {
  type: PropTypes.string.isRequired,
  addClass: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.string,
    candidate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  isFavoriteOverride: PropTypes.bool,
}

function getIdByType(type, data) {
  switch (type) {
    case 'job':
      return data.id;
    case 'company':
      return data.id;
    case 'candidate':
      return data.id;
    default:
      return '';
  }
}

function getItemsByType(type) {
  switch (type) {
    case 'job':
      return AuthService.getSavedJobIDs();
    case 'company':
      return AuthService.getSavedCompanyIDs();
    case 'candidate':
      return AuthService.getSavedCandidateIDs();
    default:
      return [];
  }
