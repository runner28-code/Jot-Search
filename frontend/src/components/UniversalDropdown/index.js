import PropTypes from 'prop-types';

export default function UniversalDropdown({ inputStyles, optionStyles, name, choices, currentChosen, handleChange, multiselect, noDefault, disabled }) { 
  return (
    <select 
      className={ inputStyles + ' cursor-pointer ' }
      name={ name }
      value={ currentChosen }
      onChange={ handleChange }
      multiple={ !!multiselect }
      required
      disabled={ disabled }
    >
      {/* Placeholder Option */}
      { renderPlaceholder(noDefault, currentChosen) }
      {/* Generate options from choices */}
      {choices.map( choice => {
        return (
          <option 
            key={ choice }
            value={ choice }
            className={ optionStyles }
          >
            { choice }
          </option>
        )
      })}
  )
