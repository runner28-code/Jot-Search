import PropTypes from 'prop-types';
import searchWhite from '../../assets/images/search-white.webp';

const defaultStylesObject = {
  containerStyles: 'flex items-center justify-evenly p-4 h-24 w-135 vw-480:w-160 vw-1024:h-36 vw-1024:w-210 bg-white border-solid border-2 border-lightGrey rounded-2xl ',
  searchIconStyles: 'h-16 w-16 vw-1024:h-24 vw-1024:w-24 vw-480:ml-6 mr-10 bg-royalBlue rounded-full flex justify-center items-center',
  inputStyles: 'flex-1 h-5/6 vw-480:placeholder:text-md vw-1024:placeholder:text-xl'
}

export default function SearchBar({ searchTerm, setSearchTerm, placeholder, marginBottom, alternateStylesObject }) {
  const styleObject = { ...defaultStylesObject, ...alternateStylesObject };
  if ( marginBottom ) {
    styleObject.containerStyles += `mb-${marginBottom} `;
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  const placeholderText = placeholder || 'Search for companies or jobs...';
  return (
      className={ styleObject.containerStyles }
      htmlFor={ placeholder }
    >
      <div className={ styleObject.searchIconStyles }>
        <img
          src={ searchWhite }
          alt='search icon'
          className='h-2/3'/>
      </div>
      <input
        type='text'
        id={ placeholder }
        placeholder={ placeholderText }
        value={ searchTerm }
        onChange={ handleChange }
        className={ styleObject.inputStyles } />
    </label>
  )
