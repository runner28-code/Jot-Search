import PropTypes from 'prop-types';
import { isObject } from 'lodash';

export default function Dropdown({ choices, handleChoiceClick, additionalStyles }) {
  const objectifiedChoices = isObject(choices[0]) ? choices : choices.map(choice => ({
    name: choice,
    id: choice,
  }));
  const { color, textColor } = additionalStyles;

  return (
    <div
      id='dropdown-wrapper'
      className={'absolute z-10 top-full w-full border-solid border-x border-b rounded-b-lg cursor-pointer border-' + color}>
      {objectifiedChoices.map((choice, index) => {
        const choiceStyles = `bg-lightGrey w-full pl-4 pr-2 py-2 text-${textColor} Desktop-Body-textBody-paragraph hover:bg-royalBlue hover:text-white ` + color + (index === choices.length - 1 ? ' rounded-b-lg' : ' border-b border-solid border-midGrey');
        return (
          <div
            onClick={() => handleChoiceClick(choice.id)}
            className={choiceStyles}
            key={choice.id}>
// Temp comment
            {choice.name}
          </div>
        )
      })}
    </div>
  )
