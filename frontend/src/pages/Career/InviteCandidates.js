import { useState } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import { appendPathToBaseUrl } from '../../services/API';
import { useGetCandidates } from '../../hooks/queries/useGetCandidates';

// Images
import { IoMailOpenOutline as MailIcon } from 'react-icons/io5';
import { useSendJobsToCandidates } from '../../hooks/mutations/useSendJobsToCandidates';

export default function InviteCandidates({ job }) {
  const { candidates, isLoading } = useGetCandidates({
    filtersArr: job.skillList?.map(skill => ({
      key: 'primarySkills',
      value: skill
    })),
    count: 10000,
    fields: ['firstName', 'lastName', 'name', 'occupation', 'companyName']
  });

  const { sendJobsToCandidates, isLoading: isSendingJob, isSuccess: successfullySentJob } = useSendJobsToCandidates()

  const candidateOptions = candidates?.map(candidate => {
    return {
      label: candidate.name ? candidate.name : `${candidate.firstName} ${candidate.lastName}`,
      value: candidate.id,
      candidate
    }
// Temp comment
  }) || [];

  const [selected, setSelected] = useState([]);
  const deleteItem = (e, value) => {
    e.stopPropagation();
    setSelected(selected.filter(item => item.value !== value))
