import PropTypes from 'prop-types';

export default function Checkbox({ id, checked, onChange, styles }) {
  return (
    <input
      type='checkbox'
      className={buttonStyles}
      checked={checked}
      onChange={() => onChange(id)}
    />
  )
