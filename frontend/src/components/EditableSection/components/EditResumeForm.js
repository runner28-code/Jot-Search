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
// Temp comment
  
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
        className='w-100 vw-480:w-120 vw-640:w-140 border-lightGrey border-2 border-solid rounded-2xl p-4 vw-480:text-lg h-24'
        name='resume'
        id='resume'
        onChange={handleFileSubmit}
      />
    </div>
  )
