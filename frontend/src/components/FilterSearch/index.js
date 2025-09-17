import PropTypes from 'prop-types';
import searchIcon from '../../assets/images/search-icon.svg';

export default function FilterSearch({ searchTerm, setSearchTerm, handleSearchClick, placeholder, additionalClasses }) {
  function handleChange(e) {
    setSearchTerm(e.target.value);
