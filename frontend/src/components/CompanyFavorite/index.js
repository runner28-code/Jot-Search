import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import { useGetSavedCompanies } from '../../hooks/queries/useGetSavedCompanies';
import LoadingSpinner from '../../components/LoadingSpinner';
import AuthService from '../../services/auth';
import CompanyCard from '../../features/ResultCard/CompactCompanyCard';
import { BsBuilding as CompanyIcon } from 'react-icons/bs';
import useWindowDimensions from '../../hooks/windowDimensions';

export default function CareerFavorite () {

  const { user_id } = AuthService.getProfile();
  const { savedCompanies, isLoading } = useGetSavedCompanies({userId: user_id});
  const { width } = useWindowDimensions();
  return(
    <div className='flex items-center flex-col justify-center bg-white rounded-lg py-24 px-12 vw-990:px-36 outline outline-1 outline-neutral-300 mb-12'>
      <div className='relative w-24 mb-8'>
        <div className='bg-indigoSquare w-12 h-12' />
        <div className='bg-pinkSquare bg-cyan-400 top-[-20px] right-[5px] absolute w-6 h-6' />
      </div>
      <h2 className='font-spaceGrotesk text-h5 text-zinc-500 mb-8 text-center'>My Company Favorites</h2>
      <div className={ width >= 990 ? 'w-full max-w-400 py-5 grid grid-cols-3 gap-16' : 'flex flex-wrap flex-col gap-[15px]'}>
        {
          isLoading ?
            <LoadingSpinner />
            :
            savedCompanies.map((company, index) => {
              console.log(company);
              return(<>
                <CompanyCard
                  index={index}
                  data={company}
                  agoDate={company.agoDate}
                />
              </>)
            })
        }
        <div className='flex items-center text-center flex-col justify-center px-16 pt-16 h-full w-130 pb-10 cursor-pointer bg-white rounded-3xl outline-dashed outline-neutral-300 bg-gray-200'>
          <CompanyIcon className='w-32 h-32 fill-royalBlue' />
          <h3 className='text-md text-zinc-700 my-8 font-spaceGrotesk font-semibold'>Find Companies to Favorite</h3>
          <Link
            to={ROUTES.careers}
            className='bg-royalBlue py-6 px-12 text-white rounded-lg'>
              Browse All
          </Link>
        </div>
      </div>
      <div className='pt-24'>
        <Link
          to={ROUTES.careers}
          class='outline outline-2 outline-royalBlue text-royalBlue font-roboto py-8 px-14 rounded-lg text-md'>
            View All
        </Link>
      </div>
    </div>
  )
