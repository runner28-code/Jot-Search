import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import OtherCareers from '../../features/OtherCareers';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import { MdOutlineLaptopMac as LaptopIcon } from 'react-icons/md';
import locationIcon from '../../assets/icons/placepin.svg';
import clockIcon from '../../assets/icons/clock.svg';
import postingAgeIcon from '../../assets/icons/calendar.svg';
import salaryIcon from '../../assets/icons/salary.svg';
import FavoriteButton from '../../features/ResultCard/FavoriteButton';
import { apply as applyRoute } from '../../routes';
import { UpdateJobStatus } from './UpdateJobStatus';
import { UpdateJobFeatured } from './UpdateJobFeatured';

const sectionHeaderStyles = 'font-spaceGrotesk font-semibold text-xl text-charcoal mb-4 ';
const hrStyles = 'mb-10 border-midGrey ';

export default function MobileLayout(props) {
  const {
    careerData,
    categoryString,
    addressString,
    salaryString,
    postingAge,
    role
  } = props.data;
  const navigate = useNavigate();
  const skillList = careerData.skillList;

  return (<>
    <section className='relative bg-white max-w-400 px-xl py-xxl border-2 border-disabled border-solid rounded-3xl mb-26'>
      {/* Header */}
      <div className='flex flex-row flex-wrap items-start'>
        <div className='basis-2/6'>
          { renderLogo(careerData.company_logo) }
          <FavoriteButton
            type='job'
            data={careerData}
          />      
        </div>
        <div className='basis-4/6 pl-8 flex flex-col items-start justify-end'>
          {/* Title */}
          <h6 className='grow text-md text-legal-bg font-spaceGrotesk font-semibold leading-none my-2'>{careerData.title}</h6>
          {/* Expertise */}
          <p className='text-royalBlue font-spaceGrotesk font-semibold mt-s'>{categoryString}</p>
        </div>
        <div className='basis-full'>
          {/* First row icons */}
          <div className='w-full flex items-center mt-xxl mb-m'>
            {/* Location */}
            <div className='flex w-1/2 items-center'>
              <img
                src={locationIcon}
                className='h-8 mr-5' />
              <p className='text-textBlack text-xs'>{addressString}</p>
            </div>
            {/* Remote/Onsite/Hybrid */}
            <div className='flex w-1/2 items-center'>
              <LaptopIcon
                className='fill-midGrey h-8 w-8 mr-5' />
              <p className='text-textBlack text-xs'>{careerData.onSite}</p>
            </div>
          </div>
          {/* Second row icons */}
          <div className='w-full flex items-center mt-8 mb-m'>
            {/* Posting age */}
            <div className='w-1/2 flex items-center pr-4'>
              <img
                src={postingAgeIcon}
                className='h-11 mr-5' />
              <p className='text-textBlack text-xs'>{postingAge}</p>
            </div>
            {/* Employement Type */}
            <div className='w-1/2 flex items-center'>
              <img
                src={clockIcon}
                className='h-8 mr-5' />
              <p className='text-textBlack text-xs'>{careerData.employmentType}</p>
            </div>
          </div>
          {/* Third row icons */}
          <div className='w-full flex items-center mt-8 mb-m'>
            {/* Salary */}
            <div className='w-1/2 flex items-center pr-4'>
              <img
                src={salaryIcon}
                className='h-11 mr-5' />
              <p className='text-textBlack text-xs'>{salaryString}</p>
            </div>
          </div>
        </div>

        {/* Coordinator Status */}
        {
          role === 'coordinator' && (
            <div className='flex flex-col space-y-8'>
              <UpdateJobStatus job={careerData} />
              <UpdateJobFeatured job={careerData} />
            </div>
          )
        }
      </div>
      <hr className={hrStyles} />
      {/* Job Description */}
      <h4 className={sectionHeaderStyles}>Career Description</h4>
      <p
        className='font-spaceGrotesk text-textBlack text-sm mb-6'
        dangerouslySetInnerHTML={{ __html: careerData.description }}
      />
      { renderSkillsSection(skillList) }
      { renderAboutCompanySection(careerData, role) }
      {/* Apply */}
      <div className='flex mt-6'>
        { (role === 'candidate' || role === 'guest') && 
          <ApplyButton
            datasource={careerData.datasource}
            careerId={careerData.id}
            applicationUrl={careerData.application_path || careerData.url}
          />
        }
        <button
          className='text-royalBlue text-lg border border-royalBlue border-solid px-14 py-6 rounded-lg ml-10'
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </section>
    <OtherCareers
      companyId={careerData.companyId}
      companyName={careerData.clientCorporation}
      currentCareerId={careerData.externalId}
    />
  </>)
}

MobileLayout.propTypes = {
  data: PropTypes.shape({
    careerData: PropTypes.object.isRequired,
    categoryString: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    postingAge: PropTypes.string.isRequired,
    addressString: PropTypes.string.isRequired,
    salaryString: PropTypes.string.isRequired,
  }).isRequired
}

function renderLogo( logo ) {
  if ( !logo ) {
    return <div className='w-36 h-36 flex justify-center items-center border border-smokeGray border-solid object-contain mr-10'>
      <CareerIcon className='w-24 h-24 fill-royalBlue' />
    </div>
  }
  return <img
    src={logo}
    className='w-36 h-36 object-contain mr-10'
  />
}

function renderAboutCompanySection(careerData) {
  if (!careerData.company) {
    return null;
  }
  const headerString = `About ${careerData.company.name}`;
  return (<>
    <hr className={hrStyles} />
    {/* About Company */}
    <p
      className='font-spaceGrotesk text-textBlack text-sm mb-10'
      dangerouslySetInnerHTML={{ __html: careerData.company.description || 'No Company Description Available' }}
    />
    <hr className={hrStyles} />
  </>)
}

function renderSkillsSection({skillList}) {
  return(<>
    <hr className={hrStyles} />
    {/* Skills Required */}
    <h4 className={sectionHeaderStyles}>Skills Required</h4>
    <SkillsList items={skillList} />
  </>)
