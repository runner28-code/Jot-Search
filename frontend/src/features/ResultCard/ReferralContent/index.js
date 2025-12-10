import PropTypes from 'prop-types';
import Header from '../Header';

export default function ReferralCardContent({ data }) {
  return (
    <>
        title={data.title} 
        isMobile={false} 
      />
      <p className='vw-640:text-md'>{data.company}</p>
    </>
  )
