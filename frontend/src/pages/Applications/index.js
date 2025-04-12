import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import {BsClipboardCheck} from 'react-icons/bs';
import ResultContainer from '../../features/ResultContainer';
import { getAppliedJobs } from '../../services/API';
import AuthService from '../../services/auth';
import useWindowDimensions from '../../hooks/windowDimensions';


export default function Applications() {
  const profile = AuthService.getProfile();
  const hiddenApplications = JSON.parse(localStorage.getItem('hiddenApplications')) || [];
  const [appliedJobsObject, setAppliedJobsObject] = useState({
    jobs: [],
    filteredJobs: [],
    loading: true
  });
  const [selectedApplications, setSelectedApplications] = useState([]);

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
    });
  }, []);

  function handleCheckClick(careerId) {
    if (selectedApplications.includes(careerId)) {
      setSelectedApplications(selectedApplications.filter(id => id !== careerId));
    } else {
      setSelectedApplications([...selectedApplications, careerId]);
    }
  }

  function removeSelectedApplications() {
    const currentHiddenApplications = JSON.parse(localStorage.getItem('hiddenApplications')) || [];
    const newHiddenApplications = [...currentHiddenApplications, ...selectedApplications];
    localStorage.setItem('hiddenApplications', JSON.stringify(newHiddenApplications));
    setSelectedApplications([]);
    setAppliedJobsObject({
      ...appliedJobsObject,
      filteredJobs: appliedJobsObject.jobs.filter(job => !newHiddenApplications.includes(job.id))
    });
  }

  const { width } = useWindowDimensions();
  return (
    <section>
      <PageHeader
        headerText='My InTulsa Featured Applications'
        IconComponent={BsClipboardCheck}
      />
      <div className='px-8'>
        <p className='Desktop-Body-textBody-paragraph-2 text-charcoal my-m'>
          Please note: Only InTulsa Featured Career postings applications can be shown (Sent or Closed status).
        </p>
        <button
          className='text-royalBlue underline'
          onClick={removeSelectedApplications}
        >
          Remove Selections
        </button>
        <ResultContainer
          containerClass={ width >= 990 ? 'grid grid-cols-3 gap-16' : 'flex flex-wrap flex-col gap-[15px]'}
          results={appliedJobsObject.filteredJobs}
          loading={appliedJobsObject.loading}
          type='job'
          compact={true}
          agoText={'Applied'}
          selectableProps={{
            selectable: true,
            selected: selectedApplications,
            handleClick: handleCheckClick
          }}
        />
      </div>
    </section>
  )
