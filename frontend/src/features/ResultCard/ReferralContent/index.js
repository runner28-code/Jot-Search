import PropTypes from 'prop-types';

export default function ReferralCardContent({ data }) {
  return (
    <>
      <Header 
        title={data.title} 
        isMobile={false} 
      />
      <p className='vw-640:text-md'>{data.company}</p>
    </>
  )
