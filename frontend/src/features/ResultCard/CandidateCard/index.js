import { Link } from 'react-router-dom';
import * as ROUTES from '../../../routes';
import PropTypes from 'prop-types';
import FavoriteButton from '../FavoriteButton';
import eyeCon from '../../../assets/icons/eye-con.svg'; // Get it? eyeCon instead of icon? It's funny.
import linkedinIcon from '../../../assets/icons/linkedin-circle.svg';
import locationIcon from '../../../assets/icons/placepin.svg';
import experienceIcon from '../../../assets/icons/star-banner.svg';
import {
  buildCandidateAddress,
  formatAvatarUrl,
  formatYearsExperience,
  buildOccupationString,
} from '../../../utils/formatFunctions';

export default function CandidateCard({ data, disableLink }) {
  const avatarUrl = formatAvatarUrl(data.avatar, data.firstName, data.lastName);
  const nameString = data.firstName + ' ' + data.lastName;
  const experienceString = formatYearsExperience(data.experienceYears, data.experience);
  const addressString = buildCandidateAddress(data);
  const expertiseString = data.expertise ? data.expertise : 'No expertise listed';
  const occupationString = buildOccupationString(data.occupation, data.companyName);
  const link = data.user ? `${ROUTES.candidates}/${data.user.id}` : `${ROUTES.candidates}/${data.id}`

  return (
    <div
      className='relative w-full'
      key={data.id}
    >
      <LinkWrapper 
        link={link}
        disableLink={disableLink}
      >
        {/* Card Image and New Lead Label */}
        <div className='flex flex-col items-center gap-m mr-20'>
          <div className='h-48 w-48 flex justify-center items-center'>
            <img
              src={avatarUrl}
              className='rounded-full'
            />
          </div>
          <NewLeadLabel status={data.status} />
        </div>
        {/* Main Content */}
        <div className='relative grow'>
          {/* Name and Active Status */}
          <div className='flex gap-s items-center'>
            <h5 className='text-h5 font-spaceGrotesk font-semibold text-charcoal leading-none'>{nameString}</h5>
            { renderActiveStatus(data) }
          </div>
          {/* Occupation */}
          <p className='text-charcoal mt-l'>{occupationString}</p>
          {/* Expertise */}
          <p className='text-royalBlue font-spaceGrotesk font-semibold text-md mt-[18px]'>{expertiseString}</p>
          {/* First row icons */}
          <div className='w-full flex flex-wrap justify-between items-center mt-l'>
            {/* Linkedin */}
            <div className='w-1/3 flex items-center'>
              <img
                src={linkedinIcon}
                className='h-8 mr-5' />
              <span className='text-charcoal'>
                LinkedIn
              </span>
            </div>
            {/* Location */}
            <div className='w-1/3 flex items-center'>
              <img
                src={locationIcon}
                className='h-8 mr-5' />
              <p className='text-charcoal'>{addressString}</p>
            </div>
            {/* Years Experience */}
            <div className='w-1/3 flex items-center'>
              <img
                src={experienceIcon}
                className='h-8 mr-5' />
              <p className='text-charcoal'>{experienceString}</p>
            </div>
          </div>
          {/* Relocation */}
          <InfoLabel
            label='Relocation'
            value={data.willRelocate}
          />
          {/* Skill List */}
          <div className='flex flex-wrap gap-m mt-[18px]'>
            { renderSkills(data.skills) }
          </div>
        </div>
      </LinkWrapper>
      <FavoriteButton
        type={'candidate'}
        data={data} />
    </div>
  )
}

CandidateCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    city: PropTypes.string,
    companyName: PropTypes.string,
    experienceYears: PropTypes.string,
    experience: PropTypes.number,
    expertise: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    occupation: PropTypes.string,
    skills: PropTypes.string,
    state: PropTypes.string,
    status: PropTypes.string,
    userDateAdded: PropTypes.string,
    workspace: PropTypes.string,
    willRelocate: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
  disableLink: PropTypes.bool,
}

// Disables link and interactivity if disableLink is true
// Temp comment
function LinkWrapper({ children, link, disableLink }) {
  const baseStyles = 'w-full flex mb-xl px-xxl-2 py-xxl-3 bg-white border border-disabled border-solid rounded-2xl remove-outline ';
  if ( disableLink ) {
    return (
      <div className={baseStyles}>
        {children}
      </div>
    );
  }

  const linkStyles = baseStyles + 'cursor-pointer hover:border-royalBlue focus:border-cyan active:border-cyan hover:border-3 focus:border-3 active:border-3'
  return (
    <Link 
      to={link}
      className={linkStyles}
      tabIndex='0'
    >
      {children}
    </Link>
  )
}

LinkWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  disableLink: PropTypes.bool,
}

function renderActiveStatus(candidate) {
  if (candidate.activelyLooking || candidate.user?.activelyLooking) {
    return (
      <div className='flex items-center gap-[10px] px-s py-xxs bg-success rounded-full'>
        <img
          src={eyeCon}
          className='w-[15px] h-[11px]'
        />
        <p className='text-white text-sm text-xxs'>Actively Looking</p>
      </div>
    )
  }

  return null;
}

function NewLeadLabel({ status }) {
  if (status === 'New Lead') {
    return (
      <div className='flex items-center justify-center gap-xxs border border-grey300 rounded-md py-[3px] px-xs'>
        <span className='bg-error h-[6px] w-[6px] rounded-full'></span>
        <p className='text-grey700 text-sm font-semibold'>New Lead</p>
      </div>
    )
  }

  return null;
}

NewLeadLabel.propTypes = {
  status: PropTypes.string,
}

function renderSkills(skillsString) {
  if ( !skillsString ) {
    return <SkillTag skill='No skills chosen' />
  }
  const skills = skillsString.split(',');
  return skills.map((skill, index) => {
    return <SkillTag
      skill={skill}
      key={index}
    />
  })
}

function SkillTag({ skill }) {
  return (
    <span className='px-7 py-1 mb-3 inline-flex items-center justify-center bg-cyan text-white rounded-full'>
      {skill}
    </span>
  )
}

SkillTag.propTypes = {
  skill: PropTypes.string.isRequired,
}

function InfoLabel({ label, value }) {
  return (
    <div className='flex items-center mt-l'>
      { renderIcon(label, value) }
      { renderText(label, value) }
    </div>
  )
