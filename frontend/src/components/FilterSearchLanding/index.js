import PropTypes from 'prop-types';

export default function FilterSearch({ searchTerm, setSearchTerm, handleSearchClick, placeholder, additionalClasses }) {
  function handleChange(e) {
    setSearchTerm(e.target.value);
