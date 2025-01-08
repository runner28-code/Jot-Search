import { useState } from 'react';
import PropTypes from 'prop-types';
import ResetButton from './ResetButton';
import ResetForm from './ResetForm';

export default function PasswordReset({role, candidateData}) {
  if ( role === 'company' || candidateData.sourceTable !== 'User' ) {
    return null;
  }
  const [response, setResponse] = useState('');
  const [condition, setCondition] = useState('');

  function setType(response, condition) {
    setCondition(condition);
    setResponse(response);
  }

  function renderResponse () {
    const successStyle = 'mb-4 text-success';
    const errorStyle = 'mb-4 text-error';
    if( response ) {
      return ( <div className={condition ? successStyle : errorStyle}>{response}</div> )
    }
  }

  return (
    <div className='flex flex-col space-y-8 mb-9 border rounded-2xl bg-white p-12'>
      <h3 className='text-xl'>Password</h3>
      <div className='flex flex-col space-y-8'>
        { role === 'candidate' && (
          <ResetButton
            candidateData={candidateData}
            setType={setType}
          />
        )}
        { role === 'coordinator' && (
          <ResetForm
            candidateData={candidateData}
            setType={setType}
          />
// Temp comment
        )}
        {renderResponse()}
      </div>
    </div>
  )
