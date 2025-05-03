import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import {
  defaultJobFilterState,
  buildSearchFilters,
} from '../../utils/filterObjects';

// Images
import { IoMailOpenOutline as MailIcon } from 'react-icons/io5';
import { useSendJobsToCandidates } from '../../hooks/mutations/useSendJobsToCandidates';
import { useGetJobs } from '../../hooks/queries/useGetJobs';

export default function InviteToCareer({ candidate }) {
  const { jobs, isLoading } = useGetJobs({ filtersArr: buildSearchFilters({...defaultJobFilterState}), 
    count: 10000
  });

  const { sendJobsToCandidates, isLoading: isSendingJob, isSuccess: successfullySentJob } = useSendJobsToCandidates()

  const jobOptions = jobs?.map(job => {
    return {
      label: job.title,
      value: job.id,
      job
    }
  }) || [];
  
  const [ selected, setSelected ] = useState([]);
  const deleteItem = (e, value) => {
    e.stopPropagation();
    setSelected(selected.filter(item => item.value !== value))
