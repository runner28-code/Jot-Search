import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import LoadingSpinner from '../../components/LoadingSpinner';
import AuthService from '../../services/auth';
import CareerCard from '../../features/ResultCard/CompactCareerCard';
import featuredIcon from '../../assets/icons/pyramid.svg';
import { getAppliedJobs } from '../../services/API';
import useWindowDimensions from '../../hooks/windowDimensions';

  const profile = AuthService.getProfile();
  const hiddenApplications = JSON.parse(localStorage.getItem('hiddenApplications')) || [];
  const [appliedJobsObject, setAppliedJobsObject] = useState({
    jobs: [],
    filteredJobs: [],
    loading: true
  });

  useEffect( async () => {
    const appliedJobs = await getAppliedJobs(profile.user_id);
    const appliedJobsWithDate = appliedJobs.map(job => {
      return {
        ...job,
        agoDate: job.appliedDate
      }});
    const filteredJobsByUnhidden = appliedJobsWithDate.filter(job => !hiddenApplications.includes(job.id));
    setAppliedJobsObject({
      jobs: appliedJobsWithDate,
      filteredJobs: filteredJobsByUnhidden,
      loading: false
    });
  }, []);

  const { width } = useWindowDimensions();
  return(
    <div className='flex items-center flex-col justify-center bg-royalBlue rounded-lg py-24 px-12 vw-990:px-36 outline outline-1 outline-neutral-300 mb-12'>
      <div className='relative w-24 mb-8'>
        <div className='bg-red-500 w-12 h-12' />
        <div className='bg-orangeSquare  top-[-20px] right-[5px] absolute w-6 h-6' />
      </div>
      <h2 className='font-spaceGrotesk text-h5 text-white mb-8 text-center'>My Pending Applications</h2>
      <div className={ width >= 990 ? 'w-full max-w-400 py-5 grid grid-cols-3 gap-16' : 'flex flex-wrap flex-col gap-[15px]'}>
        {
          appliedJobsObject.loading ?
            <LoadingSpinner />
            :
            appliedJobsObject.filteredJobs.slice(0, 2).map((career, index) => {
              return(<>
                <CareerCard
                  key={career.id}
                  index={index}
                  data={career}
                  agoDate={career.createdAt}
                />
              </>)
            })
        }
        <div className='flex items-center text-center flex-col justify-center px-16 pt-16 h-full w-130 pb-10 cursor-pointer bg-white rounded-3xl outline-dashed outline-neutral-300 bg-gray-200'>
          <div className='flex gap-[10px] items-center px-m py-xxs bg-searchGreen rounded-full'>
            <img
              src={featuredIcon}
              alt='intulsa' />
            <p className='text-sm font-bold text-white'>InTulsa Featured</p>
          </div>
          <h3 className='text-lg text-zinc-700 my-8 font-spaceGrotesk font-semibold'>Apply to an InTulsa Featured Career!</h3>
          <Link
            to={ROUTES.careers}
            className='bg-royalBlue py-6 px-12 text-white rounded-lg'>
              Browse All
          </Link>
        </div>
      </div>
      <div className='pt-24'>
        <Link
          to={ROUTES.applications}
          class='outline outline-2 outline-white text-white font-roboto py-8 px-14 rounded-lg text-md'>
            View All
        </Link>
      </div>
    </div>
  )
