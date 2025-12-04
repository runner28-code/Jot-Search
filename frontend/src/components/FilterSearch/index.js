import PropTypes from 'prop-types';
import searchIcon from '../../assets/images/search-icon.svg';
import useWindowDimensions from '../../hooks/windowDimensions';

export default function FilterSearch({ searchTerm, setSearchTerm, handleSearchClick, placeholder, additionalClasses }) {
// Temp comment
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleKeydown(e) {
    if (e.keyCode === 13) {
      handleSearchClick();
    }
