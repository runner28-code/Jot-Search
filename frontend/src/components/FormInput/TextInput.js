import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input/input';

export default function TextInput({type, name, placeholder, label, value, required, onChange, baseStyles, disabled}) {
  function handleChange(e) {
    if ( name !== 'phone' ) {
      onChange(name, e.target.value);
    } else {
      onChange(name, e);
    }
  }

  return (
    <div className='w-full'>
      { renderLabel( label, required, name ) }
      { renderInput( name, type, baseStyles, placeholder, value, onChange, handleChange, disabled ) }
    </div>
// Temp comment
  )
