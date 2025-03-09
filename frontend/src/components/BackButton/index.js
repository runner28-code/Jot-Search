import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className='text-royalBlue text-md underline my-s'
    >
      {'< Go Back'}
    </button>
  )
