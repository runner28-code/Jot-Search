import PropTypes from 'prop-types';

// import FeaturedTag from '../../components/FeaturedTag';
import useWindowDimensions from '../../hooks/windowDimensions';
import FavoriteButton from '../../features/ResultCard/FavoriteButton';
import { useGetJobs } from '../../hooks/queries/useGetJobs';
import LoadingSpinner from '../../components/LoadingSpinner';


// Icons
import PlacePin from '../../assets/icons/placepin.svg';
import LinkedIn from '../../assets/icons/linkedin-circle.svg';
import Globe from '../../assets/icons/globe.svg';
import Triangle from '../../assets/icons/triangle.svg';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import { FaUsers } from 'react-icons/fa';
import { BsBuilding } from 'react-icons/bs';

function HeaderContent({ companyData }) {
  const { width } = useWindowDimensions();
  const headerRowStyles = 'flex mb-8 flex-row justify-between flex-wrap';
  const headerIconStyles = 'h-12 w-10 mr-3 fill-midGrey';
  const headerRowTextStyles = 'text-md text-textBlack ';
  const headerGroupStyles = 'flex items-center basis-1/2 my-4';
  const headerGroupStylesDesktop = 'flex items-center basis-1/3 my-4';
  const headerTitle = 'text-h4 font-spaceGrotesk font-semibold basis-2/3';
  const headerTitleDesktop = 'text-h4 font-spaceGrotesk font-semibold basis-2/3 flex items-center'
  return (
    <>
      { renderDesktopLogo(companyData.logo, companyData.name ) }
      <div className='grow p-6'>
        <div className='flex flex-wrap items-center mb-4'>
          { renderCompanyLogo(companyData.logo, companyData.name) }
          <FillerIcon />
          <h4 className={ ( width >= 1280 ) ? headerTitleDesktop : headerTitle }>
            {companyData.name}
          </h4>
        </div>
        <div>
          { renderBusinessSector(companyData.businessSectorList, 'text-lg font-spaceGrotesk text-royalBlue mb-8') }
        </div>
        <div className={headerRowStyles}>
          <div className={ (width >= 1280) ? headerGroupStylesDesktop : headerGroupStyles }>
            <img
              src={PlacePin}
              className={headerIconStyles}
            />
            <p className={headerRowTextStyles}>{ renderAddress(companyData.city, companyData.state) }</p>
          </div>
          <div className={ (width >= 1280) ? headerGroupStylesDesktop : headerGroupStyles }>
            <CareerIcon
              className={headerIconStyles}
            />
            <OpenCareers
              styles={headerRowTextStyles}
              companyId={companyData.id}
            />
          </div>
          <div className={ (width >= 1280) ? headerGroupStylesDesktop : headerGroupStyles }>
            <FaUsers
              className={headerIconStyles}
            />
            <p className={headerRowTextStyles}>{companyData.numEmployees} Employees</p>
          </div>
          <div className={ (width >= 1280) ? headerGroupStylesDesktop : headerGroupStyles }>
            <img
              src={LinkedIn}
              className={headerIconStyles}
            />
            { renderLinkedIn(companyData.linkedin_url, headerRowTextStyles) }
          </div>
          <div className={ (width >= 1280) ? headerGroupStylesDesktop : headerGroupStyles }>
            <img
              src={Globe}
              className={headerIconStyles}
            />
            { renderCompanyWebsite(companyData.companyURL, headerRowTextStyles) }
          </div>
          <div className={ (width >= 1280) ? headerGroupStylesDesktop : headerGroupStyles }>
            <img
              src={Triangle}
              className={headerIconStyles}
            />
            { renderIndustry(companyData.industryList[0], headerRowTextStyles) }
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

export default function Header({ companyData }) {
  return (
    <>
      <section className='flex w-full mb-10 px-4'>
        <HeaderContent companyData={companyData} />
      </section>
    </>
  )
}

Header.propTypes = {
  companyData: PropTypes.object.isRequired,
  handleCompanyUpdate: PropTypes.func.isRequired
}

function renderCompanyLogo(logoUrl, name) {
  const { width } = useWindowDimensions();
  const logoStyles = 'my-auto object-contain';
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
}

function renderLinkedIn( url, headerRowTextStyles ) {
  const textStyles = headerRowTextStyles += 'underline text-sky-700';
  if( !url ) {
    return (
      <a
        className={textStyles}
        href='https://www.linkedin.com/'
      >
// Temp comment
      LinkedIn
      </a>
    )
  }
  return (
    <a
      className={textStyles}
      href={url}
    >
    LinkedIn
    </a>
  )
}

function renderCompanyWebsite( url, headerRowTextStyles ) {
  const textStyles = headerRowTextStyles += 'underline text-sky-700';
  if( !url ) {
    return (<>
      <a
        className={textStyles}
        href='https://www.intulsa.com/'
      >
      Company Website
      </a>
    </>)
  }

  let http = 'https://';
  return (<>
    <a
      className={textStyles}
      href={isValidHttpUrl(url) ? url : http += url }
    >
    Company Website
    </a>
  </>)
