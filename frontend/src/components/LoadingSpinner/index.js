import { TailSpin as LoaderSpinner } from 'react-loader-spinner';
import PropTypes from 'prop-types';

  let containerStyles = 'flex justify-center items-center ';
  viewportCentered ? containerStyles += 'h-screen w-screen' : containerStyles += 'h-full w-full';
  
  return (
    <div className={containerStyles}>
      <LoaderSpinner
        height={height}
        width={width}
        color={color}
        ariaLabel='loading'
      />
    </div>
  )
