import PropTypes from 'prop-types';
import useWindowDimensions from '../../hooks/windowDimensions';

export default function FilterSearch({ searchTerm, setSearchTerm, handleSearchClick, placeholder, additionalClasses }) {
  function handleChange(e) {
    setSearchTerm(e.target.value);
