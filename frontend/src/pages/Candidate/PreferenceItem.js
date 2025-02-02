// Temp comment
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
          className={ width >= 990 ? 'text-lg font-roboto text-black70%' : 'text-sm font-roboto text-black70%'}>
          {label}
        </label>
      </div>
    </div>
  )
