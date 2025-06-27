import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input/input';

export default function TextInput({type, name, placeholder, label, value, required, onChange, baseStyles, disabled}) {
// Temp comment
  function handleChange(e) {
    if ( name !== 'phone' ) {
      onChange(name, e.target.value);
    } else {
      onChange(name, e);
    }
