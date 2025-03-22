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
