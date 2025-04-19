import { useState, useContext } from 'react';
import { CategoryContext } from '../../../services/CategoryContext';
import PropTypes from 'prop-types';
import { uploadFile, appendPathToBaseUrl } from '../../../services/API';
import FormInput from '../../../components/FormInput';
import {
  skills as skillChoices,
  roles as roleChoices,
} from '../../../utils/skillHierarchyMap';
import { experienceMap } from '../../../utils/dbFieldMapping';
import { BiUpload as UploadIcon } from 'react-icons/bi';
import ResumePreview from './ResumePreview';

export default function ExtendedEditableContent({ candidateData, handleCandidateUpdate, setEditMode, editMode }) {
  const { categories } = useContext(CategoryContext);
  const isSourceUserTable = candidateData.sourceTable === 'User';

  const [formData, setFormData] = useState({
    id: candidateData.id,
    avatar: candidateData.avatar || '',
    firstname: candidateData.firstname || '',
    lastname: candidateData.lastname || '',
    occupation: candidateData.occupation || '',
    companyName: candidateData.companyName || '',
    address1: candidateData.address1 || '',
    address2: candidateData.address2 || '',
    city: candidateData.city || '',
    state: candidateData.state || '',
    zip: candidateData.zip || '',
    phone: candidateData.phone || '',
    categoryId: candidateData.categoryId || null,
    expertise: categories.find(category => category.id === candidateData.categoryId)?.name || '',
    roles: Array.isArray(candidateData.roles) ? candidateData.roles : (candidateData?.roles?.split(', ') || []),
    description: candidateData.description || '',
    workspace: candidateData?.workspace || '',
    experience: candidateData?.experience || '',
    skills: Array.isArray(candidateData.skills) ? candidateData.skills : (candidateData?.skills?.split(', ') || []),
    linkedin: candidateData?.linkedin || '',
    resume: candidateData?.resume || '',
  });

  function handleChange(name, value) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    if (name === 'avatar' || name === 'resume') {
      const fileToUpload = event.target.files[0];
      const pluralizedFolderName = name + 's';
      const newPath = await uploadFile(pluralizedFolderName, fileToUpload);
      console.log(newPath);
      return setFormData({ ...formData, [name]: newPath });
    }
    setFormData({ ...formData, [name]: value });
  }

  const handleCancel = () => {
    setEditMode(false);
  }
  const handleSubmit = () => {
    let dataToSubmit = {};
    dataToSubmit = { ...formData };
    dataToSubmit.skills = formData.skills.join(', ');
    dataToSubmit.roles = formData.roles.join(', ');
    if (formData.expertise) {
      dataToSubmit.categoryId = categories.find(category => category.name === formData.expertise).id;
      delete dataToSubmit.expertise;
    }

    handleCandidateUpdate(dataToSubmit);
    setEditMode(false);
  }

  const disabled = !editMode
  const disabledStyles = disabled ? 'disabled cursor-not-allowed bg-grey300' : '';

  const avatarUrl = appendPathToBaseUrl(formData.avatar);
  const resumeUrl = formData.resume ? appendPathToBaseUrl(formData.resume) : null;
  const inputStyles = `border-midGrey border-solid border rounded-2xl pl-4 bg-lightGrey ${disabledStyles} `;
  return (<>
    {/* Avatar */}
    {isSourceUserTable && <div className='flex flex-col mr-12'>
      <img
        className='w-64 h-64 mb-16'
        src={avatarUrl}
        alt='Candidate Avatar'
        title={`${formData.firstname} ${formData.lastname}`}
      />
      {editMode && <div className='mb-4 flex flex-col'>
        <label
          htmlFor='avatar'
          className='text-black70% mb-1'
        <input
          className={inputStyles + 'bg-lightGrey h-24 w-100 py-6'}
          type='file'
          name='avatar'
          accept='image/png, image/jpeg, image/jpg'
          onChange={handleInputChange}
          disabled={disabled}
        />
      </div>}
    </div>}
    <div className='grow text-black70% w-full'>
      <label
        htmlFor='description'
        className='block my-10'
      >
        <p>My Summary</p>
        {
          editMode ?
            <textarea
              className={`${inputStyles} h-60 w-full`}
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              disabled={disabled}
            />
            :
            <div
              dangerouslySetInnerHTML={{ __html: formData.description || '<p>No summary provided</p>' }}
              className={`${inputStyles} text-black70% p-6`}
            />
        }
      </label>

      {isSourceUserTable && <>
        <FormInput
          type='single-select'
          name='expertise'
          label='Expertise'
          required={true}
          placeholder='Select'
          value={formData.expertise}
          onChange={(_, choice) => setFormData({ ...formData, expertise: choice })}
          choices={categories}
          disabled={disabled}
        />

        <FormInput
          type='multi-select'
          name='roles'
          label={`What roles are you interested in?`}
          required={true}
          placeholder='Select'
          value={formData.roles || []}
          onChange={handleChange}
          choices={formData.expertise ? roleChoices[formData.expertise] : []}
          disabled={disabled}
        />
      </>}

      <FormInput
        type='single-select'
        name='experience'
        label='Years of Experience'
        required={true}
        placeholder='Select'
        value={formData.experience}
        onChange={handleChange}
        choiceObject={experienceMap}
        disabled={disabled}
      />

      {isSourceUserTable && <>
        <FormInput
          type='single-select'
          name='workspace'
          label='Work Setting Preference'
          required={true}
          placeholder='Select'
          value={formData.workspace}
          onChange={handleChange}
          choices={['Any', 'Remote', 'On Site', 'Hybrid']}
          disabled={disabled}
        />

        <SkillsInput
          value={formData.skills}
          onChange={handleChange}
          choices={skillChoices || []}
          disabled={disabled}
        />

        <div className='pt-16'>
          <FormInput
            type='text'
            name='companyName'
            value={formData.companyName}
            onChange={handleChange}
            label='Company Name'
            disabled={disabled}
          />

          <FormInput
            type='text'
            name='occupation'
            value={formData.occupation}
            onChange={handleChange}
            label='Occupation'
            disabled={disabled}
          />
          <FormInput
            type='text'
            name='linkedin'
            value={formData.linkedin}
            onChange={handleChange}
            label='LinkedIn Profile link with https:// prefix'
            disabled={disabled}
          />
        </div>

        <div className="flex space-x-4 items-center justify-start">
          {(formData.resume && !editMode) && (
            <div>
              <p>Resume</p>
              <ResumePreview resumeUrl={resumeUrl} />
            </div>
          )}

          {editMode && (
            <div className='flex flex-col'>
              <p>Upload New Resume</p>
              <p className={'text-xs text-charcoal'}>(2mb max/ Format: pdf,doc,docx,rtf)</p>
              <label
                htmlFor='resume'
                className={'cursor-pointer flex flex-col rounded-lg items-center justify-center p-4 w-100 h-100 bg-white! border-dashed border-grey300 border-1.5'}
              >
                <input
                  type='file'
                  name='resume'
                  id="resume"
                  placeholder='Resume'
                  className='hidden'
                  onChange={handleInputChange}
                  disabled={disabled}
                />
                <UploadIcon className='h-16 w-16 fill-gray-600' />
                <p>Upload</p>
              </label>
            </div>
          )}
        </div>
      </>}


      {editMode && <div className='w-full flex justify-end gap-l mt-16'>
        <button
          onClick={handleCancel}
          className='bg-white text-blue-500 border-blue-500 border-1.5 text-lg  rounded-md px-4 py-2'>Cancel</button>
        <button
          className='bg-blue-500 text-white text-lg rounded-md px-4 py-2 flex justify-center items-center'
          onClick={handleSubmit}
        >
          <span>Save</span>
        </button>
      </div>}
    </div>
  </>)
