import { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import CareerCard from '../../features/ResultCard/CompactCareerCard';
import { getInvitationsToApply } from '../../services/API';


export default function InvitationsToApply () {
  const profile = AuthService.getProfile();
  const [appliedJobsObject, setAppliedJobsObject] = useState({
    jobs: [],
    filteredJobs: [],
    loading: true
  });

  useEffect( async () => {
    const appliedJobs = await getInvitationsToApply(profile.user_id);
    const appliedJobsWithDate = appliedJobs.map(job => {
      return {
        ...job,
        agoDate: job.appliedDate
      }});
    setAppliedJobsObject({
      jobs: appliedJobsWithDate,
      loading: false
    });
  }, []);


  return(
    <div className='flex items-center flex-col justify-center bg-white rounded-lg py-24 p-12 text-center vw-990:px-36 outline outline-1 outline-neutral-300 mb-12'>
      <div className='relative w-24 mb-8'>
        <div className='bg-purple-700 w-12 h-12' />
        <div className='bg-yellowSquare  top-[-20px] right-[5px] absolute w-6 h-6' />
      </div>
      <h2 className='font-spaceGrotesk text-h5 text-zinc-500 mb-8'>Latest Invitations To Apply</h2>
      {!appliedJobsObject.loading && !appliedJobsObject.jobs?.length ? <span className='text-center font-spaceGrotesk text-zinc-500 text-xl'>No invitations to apply</span> :
        (<div className='w-full max-w-400 py-5 grid grid-cols-3 gap-16'>
          {
            appliedJobsObject.loading ?
              <LoadingSpinner />
              : appliedJobsObject.jobs.slice(0, 2).map((career, index) => {
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
        </div>)}
    </div>
  )
