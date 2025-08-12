import PropTypes from 'prop-types';
import searchIcon from '../../assets/images/search-icon.svg';
import useWindowDimensions from '../../hooks/windowDimensions';

  function handleChange(e) {
    setSearchTerm(e.target.value);
