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
      loading: false
    });
  }, []);

  function handleCheckClick(careerId) {
    if (selectedApplications.includes(careerId)) {
      setSelectedApplications(selectedApplications.filter(id => id !== careerId));
    } else {
      setSelectedApplications([...selectedApplications, careerId]);
    }
