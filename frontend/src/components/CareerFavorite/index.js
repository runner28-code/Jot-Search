import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import { useGetSavedJobs } from '../../hooks/queries/useGetSavedJobs';
import LoadingSpinner from '../../components/LoadingSpinner';
import AuthService from '../../services/auth';
import CareerCard from '../../features/ResultCard/CompactCareerCard';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import useWindowDimensions from '../../hooks/windowDimensions';

export default function CareerFavorite () {

  const { user_id } = AuthService.getProfile();
  const { savedJobs, isLoading } = useGetSavedJobs({userId: user_id});
  const { width } = useWindowDimensions();

  return(
    <div className='flex items-center flex-col justify-center bg-white rounded-lg py-24 px-12 vw-990:px-36 outline outline-1 outline-neutral-300 mb-12'>
      <div className='relative w-24 mb-8'>
        <div className='bg-yellowSquare w-12 h-12' />
        <div className='bg-cyanSquare bg-cyan-400 top-[-20px] right-[5px] absolute w-6 h-6' />
      </div>
      <h2 className='font-spaceGrotesk text-h5 text-zinc-500 mb-8 text-center'>My Career Favorites</h2>
      <div className={ width >= 990 ? 'w-full max-w-400 py-5 grid grid-cols-3 gap-16' : 'flex flex-wrap flex-col gap-[15px]'}>
        {
          isLoading ?
            <LoadingSpinner />
            :
            savedJobs.map((career, index) => {
              return(<>
                <CareerCard
                  key={career.id}
                  index={index}
                  data={career}
                  agoDate={career.createdAt}
                />
              </>)
            })
// Temp comment
        }
        <div className='flex items-center text-center flex-col justify-center px-16 pt-16 h-full w-130 pb-10 cursor-pointer bg-white rounded-3xl outline-dashed outline-neutral-300 bg-gray-200'>
          <CareerIcon className='w-32 h-32 fill-royalBlue' />
          <h3 className='text-lg text-zinc-700 my-8 font-spaceGrotesk font-semibold'>Find Careers to Favorite</h3>
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
