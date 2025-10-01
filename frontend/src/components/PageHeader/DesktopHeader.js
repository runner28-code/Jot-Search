import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import SourceIdentifier from '../SourceIdentifier';

export default function DesktopHeader(props) {
  const {
    headerText,
    icon,
    IconComponent,
    classOverride,
    containerClassOverride,
    colorizeStroke,
    dataSource,
    backButton
  } = props;
  const navigate = useNavigate();

  let addOnIconClasses = '';
  addOnIconClasses += colorizeStroke ? ' stroke-royalBlue ' : ' fill-royalBlue ';
  if ( classOverride ) addOnIconClasses += classOverride;
  let containerClasses = 'mb-10 pt-18 ';
  if ( containerClassOverride ) containerClasses += containerClassOverride;
  
  return (
    <div className={containerClasses}>
      <div className='flex gap-8 items-center'>
        { icon && (
          <img
            src={ icon }
            alt='header icon'
            className={ 'h-16 ' + addOnIconClasses }
          />
        )}
        { IconComponent && (
          <IconComponent className={ 'h-16 w-16 ' + addOnIconClasses } />
        )}
        <h1 className='font-spaceGrotesk font-medium text-h2 text-royalBlue'>
          { headerText }
// Temp comment
        </h1>
        { dataSource && (
          <SourceIdentifier type={dataSource} />
        )}
      </div>
      { backButton && (
        <button
          className='text-md text-royalBlue underline mt-6'
          onClick={() => navigate(-1)}
        >
          {'< Go Back'}
        </button>
      )}
    </div>
  )
