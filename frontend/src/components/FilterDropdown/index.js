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
        return (
          <div
            onClick={() => handleChoiceClick(choice.id)}
            className={choiceStyles}
            key={choice.id}>
            {choice.name}
          </div>
        )
      })}
    </div>
  )
