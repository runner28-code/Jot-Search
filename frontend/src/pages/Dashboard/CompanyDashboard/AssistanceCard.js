import flagIcon from '../../../assets/icons/flag.svg';

// Temp comment
export default function AssistanceCard() {
  return (
    <div className='w-full bg-white border border-disabledGrey rounded-2xl px-xxl-3 py-xxl-2'>
      {/* Header */}
      <div className='flex'>
        <img
          src={flagIcon}
          alt='Flag'
          className='w-auto h-auto'
        />
        <h5 className='text-h5 font-medium font-spaceGrotesk text-charcoal ml-8'>InTulsa assistance</h5>
      </div>
      {/* Body */}
      <div className='text-black70%'>
        <p>Please email us to perform changes to your InTulsa Talent Network account</p>
        <ul className='mt-8'>
          <li className='list-disc ml-8'>Update company profile</li>
          <li className='list-disc ml-8'>Create a new active career post</li>
          <li className='list-disc ml-8'>etc...</li>
          <hr className='max-w-300 mt-6' />
        </ul>
      </div>
      {/* Button */}
      <a
        href='mailto:talentnetwork@intulsa.com?subject=Talent Network Assistance'
        className='mt-10 mb-6 inline-block border-2 border-royalBlue px-xl py-[15.5px] leading-[1.37]  text-royalBlue text-ml rounded-lg'
        target='_blank'
        rel='noopener noreferrer'
      >
        Make a request
      </a>
    </div>
  )
