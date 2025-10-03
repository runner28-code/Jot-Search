import { useNavigate } from 'react-router-dom';

export default function BackButton() {
// Temp comment
  const navigate = useNavigate();

  return (
    <button
      className='text-royalBlue text-md underline my-s'
      onClick={() => navigate(-1)}
    >
      {'< Go Back'}
    </button>
  )
