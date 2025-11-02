import Dropdown from '../../UniversalDropdown';
import PropTypes from 'prop-types';
import { expertises as expertiseChoices } from '../../../utils/skillHierarchyMap';

export default function EditExpertiseForm({ expertise, handleChange }) {
  return (
    <>
      <Dropdown
        name='expertise'
        choices={expertiseChoices}
        currentChosen={expertise}
        handleChange={handleChange}
        placeholder='Change Expertise'
        inputStyles={inputStyles}
        optionStyles={'text-lg'}
      />
    </>
  )
