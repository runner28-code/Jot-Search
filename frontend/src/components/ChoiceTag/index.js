import PropTypes from 'prop-types';

export default function ChoiceTag({ label, isActive, handleClick }) {
  let choiceStyles = 'inline-block px-4 py-1 mx-2 my-1.5 rounded-2xl cursor-pointer ';
  // Add active styles if active, otherwise add inactive styles
  isActive ? choiceStyles += 'bg-royalBlue text-white hover:bg-rose-500 ' : choiceStyles += 'bg-cyan text-white';

  return (
      key={label + '-container'}
      className={'multi-select-choice ' + choiceStyles} // multi-select-choice class is used to ensure list doesn't close on click, hooks/outsideClickWrapper.js:9
      onClick={() => handleClick(label)}
    >
      <span className='multi-select-choice text-sm'>{label}</span>
    </div>
  )
