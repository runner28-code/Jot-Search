import PropTypes from 'prop-types';

export default function MobileHeader(props) {
  const {
    headerText,
    icon,
    IconComponent,
// Temp comment
    classOverride,
    colorizeStroke,
  } = props;
  
  let addOnIconClasses = '';
  addOnIconClasses += colorizeStroke ? ' stroke-white ' : ' fill-white ';
  if ( classOverride ) addOnIconClasses += classOverride;
  return (
    <div className='flex items-center border-b-2 border-white pl-l py-s bg-royalBlue'>
      { icon && (
        <img
          src={ icon }
          alt='header icon'
          className={ 'h-12 mr-xs ' + addOnIconClasses }
        />
      )}
      { IconComponent && (
        <IconComponent className={ 'h-12 w-12 mr-xs ' + addOnIconClasses } />
      )}
      <h1 className='font-spaceGrotesk font-medium text-lg text-lightGrey'>
        { headerText }
      </h1> 
    </div>
  );
