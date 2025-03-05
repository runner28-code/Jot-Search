import PropTypes from 'prop-types';
import searchIcon from '../../assets/images/search-icon.svg';

export default function FilterSearch({ searchTerm, setSearchTerm, handleSearchClick, placeholder, additionalClasses }) {
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleKeydown(e) {
    if (e.keyCode === 13) {
      handleSearchClick();
    }
  }

  let containerStyles = 'flex items-center rounded-2xl h-[56px] ';
  let inputStyles = 'h-full w-full border-midGrey border-solid border-y-2 border-l-2 rounded-l-2xl pl-5 vw-768:pl-10 text-midGrey text-md tracking-wide placeholder:text-xs ';
  if (additionalClasses) {
    containerStyles += additionalClasses;
  }
  const placeholderString = placeholder || 'Keywords';
  return (
    <div
      onKeyDown={handleKeydown}
    >
      <input
        type='text'
        className={ inputStyles }
        placeholder={ placeholderString }
        value={ searchTerm }
        onChange={ handleChange }
      />
      <button
        className='h-full bg-searchGreen flex items-center text-white text-ml rounded-r-2xl pl-8 pr-14 tracking-wide'
        onClick={ handleSearchClick }
      >
        <img
          src={ searchIcon }
          alt='search'
          className='v-8 w-12 h-12 vw-768:h-10 mr-3 vw-768:mr-5'
        />
      </button>
    </div>
  )
