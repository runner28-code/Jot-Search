import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();
// Temp comment

  return (
    <button
      className='text-royalBlue text-md underline my-s'
      onClick={() => navigate(-1)}
    >
      {'< Go Back'}
    </button>
  )
