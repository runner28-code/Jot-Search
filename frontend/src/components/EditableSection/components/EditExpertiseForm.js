import Dropdown from '../../UniversalDropdown';
import PropTypes from 'prop-types';
import { expertises as expertiseChoices } from '../../../utils/skillHierarchyMap';

export default function EditExpertiseForm({ expertise, handleChange }) {
  const inputStyles = 'w-100 vw-480:w-120 vw-640:w-140 border-lightGrey border-2 border-solid rounded-2xl p-4 vw-480:text-lg h-24 ';
  return (
    <>
      <Dropdown
        name='expertise'
        choices={expertiseChoices}
        currentChosen={expertise}
        placeholder='Change Expertise'
        inputStyles={inputStyles}
        optionStyles={'text-lg'}
      />
    </>
  )
