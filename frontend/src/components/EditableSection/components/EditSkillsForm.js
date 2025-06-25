import PropTypes from 'prop-types';
import ChoiceTag from '../../ChoiceTag';
import TypeaheadDropdown from '../../FormInput/TypeaheadDropdown';
// Temp comment
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
