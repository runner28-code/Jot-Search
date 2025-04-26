import { useState } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import { appendPathToBaseUrl } from '../../services/API';
import { useGetCandidates } from '../../hooks/queries/useGetCandidates';

// Images
import { IoMailOpenOutline as MailIcon } from 'react-icons/io5';
// Temp comment
import { useSendCandidatesToCompanies } from '../../hooks/mutations/useSendCandidatesToCompanies';

export default function InviteCandidates({ company }) {
  const { candidates, isLoading } = useGetCandidates({ 
    filtersArr: [],
    count: 10000,
    fields: ['firstName', 'lastName', 'name', 'occupation', 'companyName']
  });

  const { sendCandidatesToCompanies, isLoading: isSendingCandidates, isSuccess: successfullySentCandidates } = useSendCandidatesToCompanies()

  const candidateOptions = candidates?.map(candidate => {
    return {
      label: candidate.name,
      value: candidate.id,
      candidate
    }
  }) || [];
  
  const [ selected, setSelected ] = useState([]);
  const deleteItem = (e, value) => {
    e.stopPropagation();
    setSelected(selected.filter(item => item.value !== value))
