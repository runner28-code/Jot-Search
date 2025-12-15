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
    </select>
  )
}

UniversalDropdown.defaultProps = {
  inputStyles: '',
  optionStyles: '',
}

UniversalDropdown.propTypes = {
  inputStyles: PropTypes.string.isRequired,
  optionStyles: PropTypes.string,
  name: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  currentChosen: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  multiselect: PropTypes.bool,
  noDefault: PropTypes.bool,
  disabled: PropTypes.bool
}

function renderPlaceholder(noDefault, currentChosen) {
  if (noDefault) {
    return null;
  }
  return (
    <option
      defaultValue=''
      value={ currentChosen ? currentChosen : '' }
      disabled={true}
    >
      {currentChosen ? currentChosen : 'Choose One...'}
    </option>
  )
}