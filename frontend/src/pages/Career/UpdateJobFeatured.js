import PropTypes from 'prop-types';

import { useUpdateJob } from '../../hooks/mutations/useUpdateJob'

export const UpdateJobFeatured = ({ job }) => {
  const { saveJob, isLoading, isSuccess } = useUpdateJob()

  const toggled = job.featured


  const enabledButtonStyle = 'bg-green text-white'
  const disabledButtonStyle = 'bg-grey300'

  const buttonStyles = toggled ? enabledButtonStyle : disabledButtonStyle

  const enabledToggleStyles = 'translate-x-12'
  const disabledToggleStyles = 'translate-x-0'

  const toggleStyles = toggled ? enabledToggleStyles : disabledToggleStyles

  return (
    <div className='flex flex-col'>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Success!</p>}
      
      <div className='flex space-x-16'>
        <button
          type="button" 
          name="featured"
          className={`${buttonStyles} relative inline-flex h-12 w-24 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
          role="switch"
          aria-checked={toggled}
          onClick={async() => {
            const { result } = await saveJob({ featured: !toggled, id: job.id })

            // TODO: Replace with react-query refetch
            if(result) {
              window.location.reload()
            }
          }}>
          <span className="sr-only">inTulsa Featured</span>
          <span 
            aria-hidden="true" 
            className={`${toggleStyles} pointer-events-none inline-block h-10 w-10 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}>
          </span>
        </button>
      
        <label 
          htmlFor='featured' 
          inTulsa Featured
        </label>
      </div>
    </div>
  )
