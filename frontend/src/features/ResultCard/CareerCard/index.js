import { Link } from 'react-router-dom';
import * as ROUTES from '../../../routes';
import PropTypes from 'prop-types';
import FavoriteButton from '../FavoriteButton';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import { MdOutlineLaptopMac as LaptopIcon } from 'react-icons/md';
import postingAgeIcon from '../../../assets/icons/calendar.svg';
import clockIcon from '../../../assets/icons/clock.svg';
import salaryIcon from '../../../assets/icons/salary.svg';
import featuredIcon from '../../../assets/icons/pyramid.svg';
import locationIcon from '../../../assets/icons/placepin.svg';
import { buildCareerAddress, buildSalaryString, calculatePostingAge } from '../../../utils/formatFunctions';
import useWindowDimensions from '../../../hooks/windowDimensions';
import AuthService from '../../../services/auth';

export default function CareerCard({ data, active }) {
  const categoryString = data.category?.name.toUpperCase() || 'CATEGORY N/A';
  const salaryString = buildSalaryString(data.salary, data.salaryUnit)
  const postingAge = calculatePostingAge(data.createdAt);
  const addressString = buildCareerAddress(data.city, data.state);
  const role = AuthService.getUserRole();

  const { width } = useWindowDimensions();

  const dataObj = {
    data,
    categoryString,
    addressString,
    salaryString,
    postingAge,
    role
  };

  return (
    <div
      className='relative w-full'
      key={data.id}
    >
      {
        width > 768 ?
          <DesktopCard
            dataObj={dataObj}
            active={active}
          />
          :
          <MobileCard
            dataObj={dataObj}
            active={active}
          />
      }
      <FavoriteButton
        type={'job'}
        data={data} />
    </div>
  )
}

CareerCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    company_logo: PropTypes.string,
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
  }).isRequired,
  index: PropTypes.number,
  active: PropTypes.bool,
}

function DesktopCard({ dataObj, active }) {
  const { data, categoryString, addressString, salaryString, postingAge } = dataObj;
  return (
    <Link
      to={`${ROUTES.careers}/${data.id}`}
      className='w-full flex mb-10 px-16 pt-16 pb-14 cursor-pointer bg-white border border-disabledGrey border-solid rounded-3xl remove-outline hover:border-royalBlue focus:border-cyan active:border-cyan hover:border-3 focus:border-3 active:border-3'
      tabIndex='0'
      state={ active ? true : false }
    >
      {/* Card Image */}
      <div className='flex flex-col'>
        <div className='h-62 w-62 p-4 mr-18 flex justify-center items-center border border-solid border-smokeGray'>
          { renderCardImage(data) }
        </div>
        <p className='text-sm text-zinc-700 font-roboto mt-8'>{ data.clientCorporation }</p>
      </div>
      <div className='grow'>
        {/* Title */}
        <div className='flex'>
          <h6 className='text-xl font-spaceGrotesk font-semibold text-charcoal leading-none'>{data.title}</h6>
          { renderFeaturedIcon(dataObj?.data?.featured) }
        </div>
        {/* Expertise */}
        <p className='text-md text-royalBlue font-spaceGrotesk font-semibold mt-6'>{categoryString}</p>
        {/* First row icons */}
        <div className='w-full flex items-center mt-10'>
          {/* Candidate Favorites */}
          <div className='w-1/3 flex items-center pr-4'>
            <img
              src={locationIcon}
              className='h-11 mr-5' />
            <p className='text-textBlack'>{addressString}</p>
          </div>
          {/* Remote/Onsite/Hybrid */}
          <div className='w-1/3 flex items-center pr-4'>
            <LaptopIcon
              className='fill-midGrey h-11 w-8 mr-5' />
            <p className='text-textBlack'>{data.onSite}</p>
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
        <div className='w-full flex items-center mt-10'>
          {/* Employment Type */}
          <div className='w-1/3 flex items-center pr-4'>
            <img
              src={clockIcon}
              className='h-11 mr-5' />
            <p className='text-textBlack'>{data.employmentType}</p>
          </div>
          {/* Salary */}
          <div className='w-1/3 flex items-center pr-4'>
            <img
              src={salaryIcon}
              className='h-11 mr-5' />
            <p className='text-textBlack'>{salaryString}</p>
          </div>
        </div>
      </div>
    </Link>
  )
