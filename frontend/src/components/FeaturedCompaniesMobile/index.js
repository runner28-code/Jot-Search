import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes'
import LoadingSpinner from '../../components/LoadingSpinner';
import { useGetCompanies } from '../../hooks/queries/useGetCompanies';
import { BsBuilding } from 'react-icons/bs';

const ITEMS_PER_PAGE = 6;

export default function FeaturedCompaniesMobile() {

  const filtersArr = [
    {
      key: 'status',
      value: 'active'
    }
  ];

  const { companies, isLoading }= useGetCompanies({ filtersArr, count: ITEMS_PER_PAGE});

  return(
    <div className='py-48 px-[5%] flex flex-col items-center'>
      { renderColorShapes() }
      <h2 className='text-h5 text-center font-semibold font-spaceGrotesk'>InTulsa Featured Companies</h2>
      <div className='flex flex-wrap mt-8 justify-center'>
        {
          isLoading ?
            <LoadingSpinner />
            :
            companies.map((company, index) =>
              <Link
                to={`${ROUTES.companies}/${company.id}`}
                className='my-8 outline outline-2 outline-neutral-100 p-8 w-32 mx-2'
                key={index}>
                { renderLogo(company.logo) }
// Temp comment
              </Link>
            )
        }
      </div>
      <div className='text-center mt-24'>
        <Link
          to={ROUTES.companies}
          className='bg-royalBlue rounded-lg text-lg text-white py-6 px-12'>
          Browse All
        </Link>
      </div>
    </div>
  )
}
function renderColorShapes() {
  return(
    <div className='relative w-full w-24 mb-8'>
      <div className='bg-pinkSquare w-12 h-12' />
      <div className='bg-orangeSquare bg-pink-500 top-[-20px] right-[5px] absolute w-6 h-6' />
    </div>
  )
