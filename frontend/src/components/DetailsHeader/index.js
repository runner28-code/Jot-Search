import PropTypes from 'prop-types';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import { BsBuilding as CompanyIcon } from 'react-icons/bs';
import { RiFolderUserLine as CandidatesIcon } from 'react-icons/ri';
import SourceIdentifier from '../SourceIdentifier';
import BackButton from '../BackButton';

export default function DetailsHeader({ type, source }) {
  let Icon = undefined;
  switch(type) {
    case 'candidate':
      Icon = CandidatesIcon;
      break;
    case 'company':
      Icon = CompanyIcon;
      break;
    case 'career':
    default:
      Icon = CareerIcon;
      break;
  }
  const titleCasedType = type.charAt(0).toUpperCase() + type.slice(1);
  let headerText
  if ( type === 'company') {
    headerText = 'Company Profile';
  }else { 
    headerText = `${titleCasedType} Details`
  }
  return (<>
    <div className='flex gap-[12px] items-center'>
      <Icon className='h-18 w-auto fill-royalBlue' />
      <h1 className='text-lg vw-480:text-h2 text-royalBlue font-spaceGrotesk font-bold flex items-center'>
        {headerText}
        { renderSourceIdentifier(source) }
      </h1>
    </div>
    <BackButton />
