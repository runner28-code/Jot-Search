import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function MobileHeader(props) {
  const {
    headerText,
    icon,
    IconComponent,
    classOverride,
    colorizeStroke,
    backButton
  } = props;
  const navigate = useNavigate();
  
  let addOnIconClasses = '';
  addOnIconClasses += colorizeStroke ? ' stroke-white ' : ' fill-white ';
  if ( classOverride ) addOnIconClasses += classOverride;
  return (
    <div className='flex items-center mb-10 pl-l py-s bg-royalBlue'>
      { backButton && (
        <button
          className='text-s bg-cyan font-semibold text-white rounded-2xl px-5 py-2 mr-xl font-spaceGrotesk'
          onClick={() => navigate(-1)}
        >
          {'< Back'}
      )}
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
