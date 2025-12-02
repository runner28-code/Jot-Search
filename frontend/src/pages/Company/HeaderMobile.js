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
                  className={headerIconStyles}
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
}

HeaderContent.propTypes = {
  companyData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string,
    businessSectorList: PropTypes.string,
    linkedin_url: PropTypes.string,
    companyURL: PropTypes.string,
    industryList: PropTypes.array,
    address: PropTypes.string,
    employeeString: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    numEmployees: PropTypes.number,
  })
}

export default function HeaderMobile({ companyData }) {
    <>
      <section className='flex w-full mb-10 px-4'>
        <HeaderContent companyData={companyData} />
      </section>
    </>
  )
}

HeaderMobile.propTypes = {
  companyData: PropTypes.object.isRequired,
  handleCompanyUpdate: PropTypes.func.isRequired
}

function renderCompanyLogo(logoUrl, name) {
  const { width } = useWindowDimensions();
  const logoStyles = 'my-auto object-cover h-full w-full';
  if( width >= 1280 ) {
    return null;
  }
  if (!logoUrl) {
    return (
      <div className='p-8 border border-slate-70/50 mr-8'>
        <BsBuilding className={logoStyles} />
      </div>
    )
  }
  return (
    <div className='p-8 border border-slate-70/50 mr-8'>
      <img
        className={logoStyles}
        src={logoUrl}
        alt={`${name} logo`}
      />
    </div>
  )
}

function renderDesktopLogo(logoUrl, name) {
  const { width } = useWindowDimensions();
  const logoStyles = 'object-contain w-full h-full';
  if( width < 1280 ) {
    return null;
  }
  if (!logoUrl) {
    return (
      <div className='p-8 border border-slate-70/50 mr-8 w-52 h-52'>
        <BsBuilding className={logoStyles} />
      </div>
    )
  }
  return (
    <div className='p-8 border border-slate-70/50 mr-8 w-52 h-52'>
      <img
        className={logoStyles}
        src={logoUrl}
        alt={`${name} logo`}
      />
    </div>
  )
}

function FillerIcon () {
  const { width } = useWindowDimensions();

  if( width >= 1280 ) {
    return (
      <div>
        <BsBuilding className='w-16 h-16 fill-royalBlue basis-1/3 mr-8'/>
      </div>
    )
  } else {
    return null;
  }
}

function renderAddress( city, state ) {
  if( !city && !state ) {
    return (
      <span>Tulsa, OK</span>
    )
  } else {
    return (
      <span>{city}, {state}</span>
    )
  }
