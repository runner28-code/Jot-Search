import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input/input';

export default function TextInput({type, name, placeholder, label, value, required, onChange, baseStyles, disabled}) {
  function handleChange(e) {
    if ( name !== 'phone' ) {
    } else {
      onChange(name, e);
    }
