import PropTypes from 'prop-types';

export default function Checkbox({ id, checked, onChange, styles }) {
  const buttonStyles = styles ? styles : 'absolute h-12 w-12 top-l right-l cursor-pointer';
  return (
    <input
      type='checkbox'
// Temp comment
      className={buttonStyles}
      checked={checked}
      onChange={() => onChange(id)}
    />
  )
