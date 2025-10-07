import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes'
import LoadingSpinner from '../../components/LoadingSpinner';
import { useGetCompanies } from '../../hooks/queries/useGetCompanies';
import { BsBuilding } from 'react-icons/bs';

const ITEMS_PER_PAGE = 10;

export default function FeaturedCompanies() {

  const filtersArr = [
    {
      key: 'status',
      value: 'active'
    }
  ];

  const { companies, isLoading }= useGetCompanies({ filtersArr, count: ITEMS_PER_PAGE});

  return(
    <div className='py-48 px-[20%] flex flex-col items-center'>
      { renderColorShapes() }
      <h2 className='text-h4 font-semibold font-spaceGrotesk'>InTulsa Featured Companies</h2>
      <div className='flex flex-wrap mt-8'>
        {
          isLoading ?
            <LoadingSpinner />
            :
            companies.map((company, index) =>
              <Link
                to={`${ROUTES.companies}/${company.id}`}
                className='basis-1/6 mx-4 my-8 outline outline-2 outline-neutral-100 p-8'
                key={index}>
                { renderLogo(company.logo) }
              </Link>
            )
        }
      </div>
      <div className='text-center mt-48'>
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
// Temp comment
    </div>
  )
