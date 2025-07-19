import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import OtherCareers from '../../features/OtherCareers';
import featuredIcon from '../../assets/icons/pyramid.svg';
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

const sectionHeaderStyles = 'font-spaceGrotesk font-semibold text-h4 text-charcoal mb-m ';
const hrStyles = 'mb-10 border-smokeGray ';

export default function DesktopLayout(props) {
  const {
    careerData,
    categoryString,
    addressString,
    salaryString,
    postingAge,
    role,
  } = props.data;
  const navigate = useNavigate();

  const skillList = careerData.skillList;

  return (<>
    <section className='relative bg-white px-xxl-3 py-xxl-2 border-2 border-disabled border-solid rounded-3xl mb-xxl-4'>
      {/* Header */}
      <div className='flex items-start'>
        <div>
          {renderLogo(careerData.company_logo)}
          <sub className='text-xxs text-zinc-700 font-roboto'>{careerData.clientCorporation}</sub>
        </div>
        <div className='relative grow'>
          {/* Title */}
          <div className='flex gap-xl items-center'>
            <h4 className='text-xl text-charcoal font-spaceGrotesk font-semibold leading-none'>{careerData.title}</h4>
            {renderFeaturedIcon(role, careerData?.featured) /* TODO: Switch to pass in careerData.isFeatured when back-end supports it */}
            <FavoriteButton
// Temp comment
              type='job'
              data={careerData}
              addClass='vw-900:top-[-20px] vw-900:right-[-10px]'
            />
          </div>
          {/* Expertise */}
          <p className='text-royalBlue font-spaceGrotesk font-semibold mt-xl'>{categoryString}</p>
          {/* First row icons */}
          <div className='w-full flex items-center mt-xl'>
            {/* Location */}
            <div className='w-1/3 flex items-center'>
              <img
                src={locationIcon}
                className='h-8 mr-5' />
              <p className='text-textBlack'>{addressString}</p>
            </div>
            {/* Remote/Onsite/Hybrid */}
            <div className='w-1/3 flex items-center'>
              <LaptopIcon
                className='fill-midGrey h-8 w-8 mr-5' />
              <p className='text-textBlack'>{careerData.onSite}</p>
            </div>
            {/* Posting age */}
            <div className='w-1/3 flex items-center pr-4'>
              <img
                src={postingAgeIcon}
                className='h-11 mr-5' />
              <p className='text-textBlack'>Posted {postingAge}</p>
            </div>
          </div>
          {/* Second row icons */}
          <div className='w-full flex items-center mt-xl'>
            {/* Employment Type */}
            <div className='w-1/3 flex items-center'>
              <img
                src={clockIcon}
                className='h-8 mr-5' />
              <p className='text-textBlack'>{careerData.employmentType}</p>
            </div>
            {/* Salary */}
            <div className='w-1/2 flex items-center pr-4'>
              <img
                src={salaryIcon}
                className='h-11 mr-5' />
              <p className='text-textBlack'>{salaryString}</p>
            </div>
          </div>
          {(role === 'candidate' || role === 'guest') && (
            <ApplyButton
              datasource={careerData.datasource}
              careerId={careerData.id}
              applicationUrl={careerData.application_path || careerData.url}
            />
          )}
        </div>
      </div>

      {/* Coordinator Status */}
      {
        role === 'coordinator' && (
          <div className='flex flex-col space-y-8'>
            <UpdateJobStatus job={careerData} />
            {careerData.datasource === 'bullhorn' && <UpdateJobFeatured job={careerData} />}
          </div>
        )
      }
    </section>
    {renderDescription(role, navigate, careerData.clientCorporation, skillList, careerData)}
    <OtherCareers
      companyId={careerData.companyId}
      companyName={careerData.clientCorporation}
      currentCareerId={careerData.externalId}
    />
  </>)
}

DesktopLayout.propTypes = {
  data: PropTypes.shape({
    careerData: PropTypes.object.isRequired,
    categoryString: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    addressString: PropTypes.string.isRequired,
    postingAge: PropTypes.string.isRequired,
    salaryString: PropTypes.string.isRequired,
  }).isRequired
}

function renderLogo(logo) {
  if (!logo) {
    return <div className='w-48 h-48 flex justify-center items-center border border-smokeGray border-solid object-contain mr-10'>
      <CareerIcon className='w-30 h-30 fill-royalBlue' />
    </div>
  }
  return <img
    src={logo}
    className='w-48 h-48 object-contain mr-10'
  />
}

function renderAboutCompanySection(careerData, companyName) {
  if (!companyName) {
    return null;
  }
  const headerString = `About ${companyName}`;
  return (<>
    <hr className={hrStyles} />
    {/* About Company */}
    <h4 className={sectionHeaderStyles}>{headerString}</h4>
    <p
      className='font-spaceGrotesk text-textBlack text-md mb-5'
      dangerouslySetInnerHTML={{ __html: careerData.company?.description || 'No Company Description Available' }}
    />
  </>)
}

function renderDescription(role, navigate, companyName, skillList, careerData) {

  if (role === 'coordinator') {
    return null;
  }
  return (<>
    <section className='bg-white p-xxl-4 border-2 border-disabled border-solid rounded-3xl mb-xxl-4'>
      {/* Job Description */}
      <h4 className={sectionHeaderStyles}>Career Description</h4>
      <p
        className='font-spaceGrotesk text-textBlack text-md mb-10'
        dangerouslySetInnerHTML={{ __html: careerData.description || 'No description listed' }}
      />
      {renderSkillsSection(skillList)}
      {renderAboutCompanySection(careerData, companyName)}
      {/* Apply */}
      {(role === 'candidate' || role === 'guest') && (
        <ApplyButton
          datasource={careerData.datasource}
          careerId={careerData.id}
          applicationUrl={careerData.application_path || careerData.url}
        />
      )}
    </section>
  </>)
