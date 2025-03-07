import PropTypes from 'prop-types';

// import FeaturedTag from '../../components/FeaturedTag';
import useWindowDimensions from '../../hooks/windowDimensions';
import FavoriteButton from '../../features/ResultCard/FavoriteButton';
import { useGetJobs } from '../../hooks/queries/useGetJobs';
import LoadingSpinner from '../../components/LoadingSpinner';


// Icons
import PlacePin from '../../assets/icons/placepin.svg';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import { BsBuilding } from 'react-icons/bs';

function HeaderContent({ companyData }) {
  const headerIconStyles = 'h-6 w-6 mr-3 fill-midGrey';
  const headerRowTextStyles = 'text-xs text-textBlack ';
  const headerGroupStyles = 'flex items-center flex-row basis-1/2 my-4';
  const headerTitle = 'text-[2.5rem] font-spaceGrotesk font-semibold basis-2/3';
  console.log(companyData);
  return (
    <>
      { renderDesktopLogo(companyData.logo, companyData.name ) }
      <div className='grow p-2'>
        <div className='flex flex-wrap items-center mb-4'>
          <div className='basis-2/6'>
            { renderCompanyLogo(companyData.logo, companyData.name) }
            <FillerIcon />
          </div>
          <div className='basis-4/6'>
            <h4 className={ headerTitle }>
              {companyData.name}
            </h4>
            <div className='flex items-center'>
              <div className={ headerGroupStyles }>
                <img
                  src={PlacePin}
                />
                <p className={headerRowTextStyles}>{ renderAddress(companyData.city, companyData.state) }</p>
              </div>
              <div className={ headerGroupStyles }>
                <CareerIcon
                  className={headerIconStyles}
                />
                <OpenCareers
                  styles={headerRowTextStyles}
                  companyId={companyData.id}
                />
              </div> 
            </div>
          </div>
        </div>

        <FavoriteButton
          type={'company'}
          data={companyData} />
      </div>
    </>
  )
