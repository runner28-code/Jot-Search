import { Link } from 'react-router-dom';
import softwareEngineeringIcon from '../../assets/images/Symbol_softwareengineering.svg';
import salesAndBizDevIcon from '../../assets/images/Symbol_Salesbizdev.svg';
import marketingIcon from '../../assets/images/Symbol_marketing.svg';
import operationsIcon from '../../assets/images/Symbol_operations.svg';
import financeIcon from '../../assets/images/Symbol_finance.svg';
import * as ROUTES from '../../routes';

export default function ExpertiseLinksMobile() {
  const linkStyles = 'flex flex-col items-center basis-1/3 p-6 text-center';
  const iconStyles = 'mb-10';
  const textStyles = 'text-xs text-darkGray';

  return (
    <section className='mt-70 mb-24 flex flex-col items-center'>
      <h4 className='text-h5 font-spaceGrotesk font-semibold text-darkGray text-center'>
        Browse Opportunities by Career Expertise
      </h4>
      <div className='mt-20 flex flex-wrap justify-center'>
        {/* Software & Engineering */}
        <Link
          to={ROUTES.careers}
          className={linkStyles}
          state={{ Expertise: 'Software & Engineering' }}
        >
          <img
            src={softwareEngineeringIcon}
            alt='Software Engineering Icon'
            className={iconStyles}
          />
          <span className={textStyles}>Software &</span>
          <span className={textStyles}>Engineering</span>
        </Link>
        {/* Sales & Business Development */}
        <Link
          to={ROUTES.careers}
          className={linkStyles}
          state={{ Expertise: 'Sales & Biz Dev' }}
        >
          <img
            src={salesAndBizDevIcon}
            alt='Sales & Biz Dev Icon'
            className={iconStyles}
          />
          <span className={textStyles}>Sales & Business</span>
          <span className={textStyles}>Development</span>
        </Link>
        {/* Marketing */}
        <Link
          to={ROUTES.careers}
          className={linkStyles}
          state={{ Expertise: 'Marketing' }}
        >
          <img
            src={marketingIcon}
            alt='Marketing Icon'
            className={iconStyles}
          />
          <span className={textStyles}>Marketing</span>
        </Link>
        {/* Operations */}
        <Link
          to={ROUTES.careers}
          className={linkStyles}
          state={{ Expertise: 'Operations' }}
        >
          <img
            src={operationsIcon}
            alt='Operations Icon'
            className={iconStyles}
          />
          <span className={textStyles}>Operations</span>
        </Link>
        {/* Finance */}
        <Link
          to={ROUTES.careers}
          className={linkStyles}
          state={{ Expertise: 'Finance' }}
        >
          <img
            src={financeIcon}
            alt='Finance Icon'
            className={iconStyles}
          />
          <span className={textStyles}>Finance</span>
      </div>
    </section>
  )
