import PropTypes from 'prop-types';

export default function EditSummaryForm({ summaryText, setSummary }) {
  return <textarea 
    name='comments'
    onChange={setSummary}
    value={summaryText} />
