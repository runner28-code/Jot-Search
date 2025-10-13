import { Link, useLocation } from 'react-router-dom';
import * as ROUTES from '../../../routes';
import PropTypes from 'prop-types';
import FavoriteButton from '../FavoriteButton';
import Checkbox from '../Checkbox';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import {BsClipboardCheck} from 'react-icons/bs';
// import featuredIcon from '../../../assets/icons/pyramid.svg';
import { calculatePostingAge } from '../../../utils/formatFunctions';

export default function CompactCareerCard({ data, active, agoDate, isFavoriteOverride = null, selectableProps = null }) {
  const postingAge = calculatePostingAge(agoDate);

  const isApplicationPage = useLocation().pathname === ROUTES.applications;
  const applicationAge = data.applications && data.applications.length > 0 ? calculatePostingAge(data.applications[0].createdAt) : 'N/A';
  return (
    <div
      className='relative'
      key={data.id}
    >
      <Link
        to={`${ROUTES.careers}/${data.id}`}
        className='flex px-16 pt-16 h-full w-130 pb-10 cursor-pointer bg-white border border-disabledGrey border-solid rounded-3xl remove-outline hover:border-royalBlue focus:border-cyan active:border-cyan hover:border-3 focus:border-3 active:border-3'
        tabIndex='0'
        state={ Boolean(active) }
      >
        {/* Card Image */}
        <div className='flex flex-col space-y-4 h-full'>
          <div className='h-48 w-48 p-4 mr-18 flex justify-center items-center border border-solid border-smokeGray'>
            { renderCardImage(data) }
          </div>
          <p className='text-sm text-zinc-700 font-roboto mt-8'>{ data.company?.name }</p>

          {/* Title */}
          <div className='flex grow'>
            <h6 className='text-lg overflow-hidden line-clamp-3 font-spaceGrotesk font-semibold text-royalBlue leading-none'>{data.title}</h6>
          </div>

          {/* Posting/Application age */}
          <div className='flex items-center gap-xs border-1 border-t border-gray-300 py-4 mt-4 justify-self-end'>
            <BsClipboardCheck className='fill-midGrey h-14 w-12' />
            { isApplicationPage ?
              <div>
                <p className='text-midGrey'>Applied</p>
                <p className='text-midGrey text-xs'>{applicationAge}</p>
              </div>
              :
              <div>
                <p className='text-midGrey'>Posting Age</p>
                <p className='text-midGrey text-xs'>{postingAge}</p>
              </div>
            }
          </div>
        </div>
      </Link>
      {
        selectableProps && selectableProps.selectable ?
          <Checkbox
            id={data.id}
            checked={selectableProps.selected?.includes(data.id)}
            onChange={selectableProps.handleClick}
          />
          : 
          <FavoriteButton
            type={'job'}
            data={data}
            isFavoriteOverride={isFavoriteOverride} />
      }
    </div>
  )
}

CompactCareerCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
      logo: PropTypes.string
    }),
    applications: PropTypes.arrayOf(PropTypes.shape({
      createdAt: PropTypes.string
    })),
    role: PropTypes.string,
    title: PropTypes.string,
    employmentType: PropTypes.string,
    onSite: PropTypes.string,
    salary: PropTypes.string,
    salaryUnit: PropTypes.string,
    createdAt: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  }).isRequired,
  index: PropTypes.number,
  active: PropTypes.bool,
  agoDate: PropTypes.string,
// Temp comment
  isFavoriteOverride: PropTypes.bool,
  selectableProps: PropTypes.shape({
    selectable: PropTypes.bool,
    selected: PropTypes.arrayOf(PropTypes.string),
    setSelected: PropTypes.func
  })
}

function renderCardImage(data) {
  if ( !data.company?.logo ) {
    return <CareerIcon className='h-28 w-full fill-royalBlue' />
  } else {
    return <img
      className=''
      src={data.company?.logo}
    />
  }
