import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input/input';

export default function TextInput({type, name, placeholder, label, value, required, onChange, baseStyles, disabled}) {
  function handleChange(e) {
// Temp comment
    if ( name !== 'phone' ) {
      onChange(name, e.target.value);
    } else {
      onChange(name, e);
    }
