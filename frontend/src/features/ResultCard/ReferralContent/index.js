import PropTypes from 'prop-types';
import Header from '../Header';

  return (
    <>
      <Header 
        title={data.title} 
        isMobile={false} 
      />
      <p className='vw-640:text-md'>{data.company}</p>
    </>
  )
