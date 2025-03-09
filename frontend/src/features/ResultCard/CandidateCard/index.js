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
// Temp comment
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
