import { Link } from 'react-router-dom';
import * as ROUTES from '../../../routes';
import PropTypes from 'prop-types';
import FavoriteButton from '../FavoriteButton';
import Checkbox from '../Checkbox';
import { BsBuilding as CompanyIcon } from 'react-icons/bs';
// import featuredIcon from '../../../assets/icons/pyramid.svg';
import {  calculatePostingAge } from '../../../utils/formatFunctions';

export default function CompactCompanyCard({ data, active, agoDate, isFavoriteOverride = null, agoText = 'Saved', selectableProps = null }) {
  const postingAge = calculatePostingAge(agoDate);

  return (
    <div
      className='relative'
      key={data.id}
    >
      <Link
        to={`${ROUTES.companies}/${data.id}`}
        className='flex px-16 pt-16 h-full w-130 pb-10 cursor-pointer bg-white border border-disabledGrey border-solid rounded-3xl remove-outline hover:border-royalBlue focus:border-cyan active:border-cyan hover:border-3 focus:border-3 active:border-3'
        tabIndex='0'
        state={ Boolean(active) }
      >
        {/* Card Image */}
        <div className='flex flex-col space-y-4 h-full'>
          <div className='h-48 w-48 p-4 mr-18 flex justify-center items-center border border-solid border-smokeGray'>
            { renderCardImage(data) }
          </div>

          {/* Title */}
          <div className='flex'>
            <h6 className='text-lg overflow-hidden line-clamp-3 font-spaceGrotesk font-semibold text-royalBlue leading-none'>{data.name}</h6>
          </div>

          {/* Posting age */}
          <div className='border-1 border-t border-gray-300 py-4 mt-4 justify-self-end'>
            <p className='text-grey-700 opacity-50'>{agoText} {postingAge}</p>
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
            type={'company'}
            data={data}
            isFavoriteOverride={isFavoriteOverride} />
      }
    </div>
  )
}

CompactCompanyCard.propTypes = {
    id: PropTypes.string,
    company_logo: PropTypes.string,
    name: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired,
  index: PropTypes.number,
  active: PropTypes.bool,
  agoDate: PropTypes.string,
  isFavoriteOverride: PropTypes.bool,
  agoText: PropTypes.string,
  selectableProps: PropTypes.shape({
    selectable: PropTypes.bool,
    selected: PropTypes.arrayOf(PropTypes.string),
    setSelected: PropTypes.func
  })
}

function renderCardImage(data) {
  if ( !data.company_logo ) {
    return <CompanyIcon className='h-28 w-full fill-royalBlue' />
  } else {
    return <img
      className=''
      src={data.company_logo}
    />
  }
