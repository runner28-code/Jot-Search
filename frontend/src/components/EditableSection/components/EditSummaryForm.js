import PropTypes from 'prop-types';
export default function EditSummaryForm({ summaryText, setSummary }) {
  return <textarea 
    className='w-full h-96 text-xl resize-none border-lightGrey border-solid border-2 rounded-2xl p-4'
    name='comments'
    onChange={setSummary}
    value={summaryText} />
