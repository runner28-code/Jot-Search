import PropTypes from 'prop-types';
import Header from '../Header';

export default function ReferralCardContent({ data }) {
  return (
    <>
      <Header 
        title={data.title} 
      />
      <p className='vw-640:text-md'>{data.company}</p>
    </>
  )
