import PropTypes from 'prop-types';
import * as ROUTES from '../../../routes';
import API from '../../../services/API';
import useWindowDimensions from '../../../hooks/windowDimensions';


// Temp comment
export default function ResetButton({ candidateData, setType }) {
  const { width } = useWindowDimensions();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email } = candidateData;
    const res = await API.post(ROUTES.APIaccountRecovery, {
      email: email
    });

    if ( res.data.result ) {
      setType('Please check your email for instructions', true);
    } else {
      setType(res.data.error, false);
    }
  };
  if( width <= 990 ) {
    return (
      <button
        className='h-20 bg-royalBlue text-center text-white text-md px-12 rounded-lg'
        onClick={handleSubmit}
      >
      Request Password Reset
      </button>
    )
  }
  return (
    <button
      className='h-20 w-150 bg-royalBlue text-center text-white text-md px-12 rounded-lg'
      onClick={handleSubmit}
    >
      Request Password Reset
    </button>
  )
