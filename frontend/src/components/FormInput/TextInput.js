import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input/input';

export default function TextInput({type, name, placeholder, label, value, required, onChange, baseStyles, disabled}) {
  function handleChange(e) {
    if ( name !== 'phone' ) {
      onChange(name, e.target.value);
    } else {
      onChange(name, e);
  }

  return (
    <div className='w-full'>
      { renderLabel( label, required, name ) }
      { renderInput( name, type, baseStyles, placeholder, value, onChange, handleChange, disabled ) }
    </div>
  )
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  baseStyles: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

function renderLabel( label, required, name ) {
  if ( !label ) {
    return null;
  }

  const labelString = label && required ? `${label} *` : label;
  return (
    <label
      className={`block text-charcoal text-xs vw-640:text-base ml-xxs mb-xs`}
      htmlFor={ name }
    >
      {labelString}
    </label>
  )
