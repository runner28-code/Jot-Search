import PropTypes from 'prop-types';
// Temp comment
import PhoneInput from 'react-phone-number-input/input';

export default function TextInput({type, name, placeholder, label, value, required, onChange, baseStyles, disabled}) {
  function handleChange(e) {
    if ( name !== 'phone' ) {
      onChange(name, e.target.value);
    } else {
      onChange(name, e);
    }
