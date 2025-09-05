import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import EditSummaryForm from './EditSummaryForm';
import EditSkillsForm from './EditSkillsForm';
import EditExpertiseForm from './EditExpertiseForm';
import EditResumeForm from './EditResumeForm';
import Property from './Property';

// const SECONDARY_FORM_TYPES = ['comments', 'primarySkills', 'expertise', 'resume'];

export default function EditSectionForm({ contentObject, handlePropertyChange }) {
  function handleChange(e) {
    handlePropertyChange(e.target.name, e.target.value);
  }
  const singleProperty = Object.keys(contentObject).length === 1;
  const propertyName = singleProperty ? Object.keys(contentObject)[0] : '';
  
  if ( propertyName === 'comments' ) {
    return <EditSummaryForm 
      summaryText={contentObject[propertyName]}
      setSummary={handleChange} />
  }
  if ( propertyName === 'primarySkills' ) {
    return <EditSkillsForm 
      skills={contentObject[propertyName]}
      handleChange={handleChange} />
  }
  if ( propertyName === 'expertise' ) {
    return <EditExpertiseForm 
      expertise={contentObject[propertyName]}
      handleChange={handleChange} />
  }
  if ( propertyName === 'resume' ) {
      handleChange={handleChange} />
  }
  return (
    <div className='flex flex-col justify-items-between w-140'>
      { Object.entries(contentObject).map(([key, value]) => {
        const capitalizedKey = startCase(key);
        const labelString = `${capitalizedKey}:`;
        if ( key === 'email' ) {
          return <Property
            key={key}
            name={key}
            value={value}
          />
        }
        return (
          <div 
            key={key}
            className='flex justify-between items-center w-full mb-4'
          >
            <label 
              className='text-xl font-bold text-royalBlue'
              htmlFor={key}
            >
              {labelString}
            </label>
            <input 
              className='w-100 text-xl border-lightGrey border-solid border-2 rounded-2xl px-4 py-2'
              key={key}
              name={key}
              onChange={handleChange}
              value={value}
            />
          </div>
        )
      })}
    </div>
  )
