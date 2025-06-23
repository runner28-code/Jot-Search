import PropTypes from 'prop-types';
import Header from '../Header';

export default function ReferralCardContent({ data }) {
  return (
    <>
      <Header 
        title={data.title} 
        isMobile={false} 
      />
    </>
  )
