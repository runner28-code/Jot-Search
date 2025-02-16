import PropTypes from 'prop-types';
import useWindowDimensions from '../../hooks/windowDimensions';

export const PreferenceItem = ({ toggled, label, fieldName, onUpdate, disabled }) => {
  const { width } = useWindowDimensions();
  return (
    <div className='flex flex-col mt-5'>
      <div className='flex space-x-16'>
        <SwitchButton
          fieldName={fieldName}
          label={label}
          toggled={toggled}
          onToggle={onUpdate}
          disabled={disabled}
        />
        <label 
          htmlFor='featured' 
          {label}
        </label>
      </div>
    </div>
  )
