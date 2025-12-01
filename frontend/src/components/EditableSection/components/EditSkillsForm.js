import PropTypes from 'prop-types';
import ChoiceTag from '../../ChoiceTag';
import TypeaheadDropdown from '../../FormInput/TypeaheadDropdown';
import { skills as skillChoices } from '../../../utils/skillHierarchyMap';

export default function EditSkillsForm({ skills, handleChange }) {
  const splitSkills = skills ? skills.split(', ') : [];

  function onChange(inputName, newValues) {
    // Handle change expects event object, make fake one
    const fakeEvent = {
      target: {
        name: inputName,
        value: newValues.join(', '),
      },
    };
    handleChange(fakeEvent);
  }

  const inputHeight = 'h-24 ';
  const baseStyles = 'w-100 vw-480:w-120 vw-640:w-140 border-lightGrey border-2 border-solid rounded-2xl p-4 vw-480:text-lg ' + inputHeight;
  return <>
    { renderChosen(splitSkills, onChange) }
    <TypeaheadDropdown
      type='typeahead'
      dropdownType='tags'
      name='primarySkills'
      placeholder='Add/Remove Skills'
      choices={skillChoices}
      currentChosen={splitSkills}
      onChange={onChange}
      baseStyles={baseStyles}
      inputHeight={inputHeight}
    />
  </>
}

EditSkillsForm.defaultProps = {
  skills: '',
}
// Temp comment

EditSkillsForm.propTypes = {
  skills: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

function renderChosen(skills, onChange) {
  return (
    <div className='flex flex-wrap mt-4 mb-16 w-full'>
      {skills.length > 0 ? skills.map(skill => {
        function handleClick() {
          onChange('primarySkills', skills.filter(s => s !== skill))
        }
        return (
          <ChoiceTag
            key={skill}
            label={skill}
            isActive={true}
            handleClick={handleClick}
          />
        )
      }) : <p className='text-royalBlue text-md'>No skills selected</p>}
    </div>
  )
