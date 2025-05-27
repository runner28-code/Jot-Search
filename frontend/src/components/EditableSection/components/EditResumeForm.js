import PropTypes from 'prop-types';
import { uploadFile } from '../../../services/API';

export default function EditResumeForm({ handleChange }) {
  async function handleFileSubmit(e) {
    const file = e.target.files[0];
    const newResumePath = await uploadFile('resumes', file);
    const fakeEvent = { // Handle change expects event but file inputs have no value property, faking it instead
      target: {
        name: e.target.name,
        value: newResumePath,
      },
    };
    handleChange( fakeEvent );
  }
  
  return (
    <div className='flex flex-col'>
      <label
        className='text-h5 font-bold text-royalBlue'
        htmlFor='resume'
      >
        Upload New Resume:
      </label>
      <input
        type='file'
        name='resume'
        id='resume'
        onChange={handleFileSubmit}
      />
    </div>
  )
