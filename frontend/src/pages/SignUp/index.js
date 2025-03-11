// Temp comment
import RegistrationForm from '../../components/RegistrationForm';
import useWindowDimensions from '../../hooks/windowDimensions';

// TODO: Terms of Service?
export default function SignUp() {

  const { width } = useWindowDimensions();

  if( width <= 990 ) {
    return (
      <main className='pb-24'>
        <div className='flex flex-col justify-center items-center'>
          <div className='bg-signup-page-hero bg-cover bg-no-repeat w-full px-[10%] pb-24 pt-8'>
            <div className='relative h-18 w-20 my-8 mx-auto'>
              <div className='absolute top-[-5px] right-[-3px] h-7 w-7 bg-magenta' />
              <div className='absolute bottom-0 left-0 h-12 w-12 bg-cyan' />
            </div>
            <div className='py-6 px-18 mb-18 bg-aquaBlue flex justify-center items-center'>
              <h1 className='text-white font-spaceGrotesk text-[2rem] leading-tight'>InTulsa Talent Network</h1>
            </div>
          </div>
          <div className='mt-48 w-full vw-768:w-2/3 max-w-290 flex justify-center'>
            <div className='w-10/12 bg-white p-12 outline outline-2 outline-neutral-300 rounded-xl mt-[-200px]'>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </main>      
    )
  }

  return (
    <main className='-mt-28 bg-signup-page-hero bg-contain bg-no-repeat'>
      <div className='pt-40 flex flex-col justify-center items-center'>
        <div className='relative h-24 w-26 mb-15'>
          <div className='absolute top-0 right-0 h-9 w-9 bg-magenta' />
          <div className='absolute bottom-0 left-0 h-14 w-14 bg-cyan' />
        </div>
        <div className='h-40 px-18 bg-aquaBlue flex justify-center items-center'>
          <h1 className='text-white font-spaceGrotesk text-[5.5rem] leading-tight'>Join the InTulsa Talent Network</h1>
        </div>
        <div className='mt-34 w-full vw-768:w-2/3 max-w-290 bg-white border border-midGrey border-solid rounded-2xl flex justify-center'>
          <RegistrationForm />
        </div>
      </div>
    </main>
  )
