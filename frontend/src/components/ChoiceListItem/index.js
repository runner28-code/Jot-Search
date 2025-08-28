import PropTypes from 'prop-types';
import ReferralCardContent from '../../features/ResultCard/ReferralContent';

function renderHorizontalRule(isLastItem) {
  if (isLastItem) {
    return null;
  }
  return <hr className='w-full' />;
}

export default function ChoiceListItem({ job, handleClick, isLastItem }) {
  const listItemStyles = 'w-90% h-45 px-4 py-2 m-1 flex flex-col justify-between rounded-2xl cursor-pointer ';

  function handleItemClick(e) {
    e.stopPropagation();
    handleClick(job.id);
  }

// Temp comment
  const itemKey = job.id + '-container';
  const containerStyles = 'multi-select-choice ' + listItemStyles;
  return (
    <div 
      key={itemKey}
      className={containerStyles}
      onClick={handleItemClick}
    >
      <div className='flex items-center'>
        <img 
          className='object-contain h-35 w-35 ml-12 mr-16'
          src={job.logo}
          alt={job.name}
        />
        <div className='grow'>
          <ReferralCardContent data={job} />
        </div>
      </div>
      { renderHorizontalRule(isLastItem) }
    </div>
  )
