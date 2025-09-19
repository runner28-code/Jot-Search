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
}

PreferenceItem.propTypes = {
  toggled: PropTypes.bool.isRequired,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export function SwitchButton({ fieldName, label, toggled, onToggle, disabled }) {
  const toggleOnButtonStyle = 'bg-green text-white cursor-pointer'
  const toggleOffButtonStyle = 'bg-grey300 cursor-not-allowed'

  const buttonStyles = (toggled && !disabled) ? toggleOnButtonStyle : toggleOffButtonStyle

  const toggleOnToggleStyles = 'translate-x-12'
  const toggleOffToggleStyles = 'translate-x-0'

  const toggleStyles = toggled ? toggleOnToggleStyles : toggleOffToggleStyles
  const handleToggle = () => {
    if (disabled) {
      return null;
    }
    const mockEvent = {
      target: {
        name: fieldName,
        value: !toggled,
      }
    }
    return onToggle(mockEvent)
  }
  
  return (
    <button
      type="button" 
      name={fieldName}
      className={`${buttonStyles} relative inline-flex h-12 w-24 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
      role="switch"
      aria-checked={toggled}
      onClick={handleToggle}
    >
      <span className="sr-only">{label}</span>
      <span 
        aria-hidden="true" 
        className={`${toggleStyles} pointer-events-none inline-block h-10 w-10 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}>
      </span>
    </button>
  )
