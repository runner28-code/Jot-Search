import { TailSpin as LoaderSpinner } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export default function LoadingSpinner({ height = '100', width = '100', color = '#216BB2', viewportCentered = false }) {
  let containerStyles = 'flex justify-center items-center ';
  
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
