import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../../routes';
import useWindowDimensions from '../../hooks/windowDimensions';

export default function JoinTalentNetwork() {

  const { width } = useWindowDimensions();

  if( width <= 990 ) {
    return (<>
      {/* Join Hero and call-to-action */}
      <section className='relative h-200 bg-join-hero bg-cover bg-center mb-[600px]'>
        <div className='justify-center w-11/12 mx-[5%] absolute -bottom-[100%]'>
          <div className='px-12 py-12 flex flex-col rounded-3xl bg-royalBlue'>
            <h1 className='text-h5 font-spaceGrotesk font-semibold text-softWhite'>
              Join the InTulsa Talent Network
            </h1>
            <p className='text-sm leading-[3rem] text-softWhite mt-8'>
              Build your profile with the type of opportunity you want to attract and next exclusively with our network. Receive email alerts that make you first to know about relevant new opportunities, based on your preferences.
            </p>
            <Link
              to={ROUTES.signup}
              className='flex items-center justify-center h-28 w-112 bg-buttonLightBlue mt-12 px-18 rounded-lg'
            >
              <span className='text-softWhite text-ml'>Create an account</span>
            </Link>
          </div>
          <div className='mt-8 px-[5%]'>
            <h6 className='text-[2.5rem] mt-12 font-spaceGrotesk font-semibold text-slateGray'>Get Connected in Tulsa</h6>
            <p className='text-slateGray text-ml mt-6 font-light leading-[3.6rem]'>By signing up, you will be able to connect and support you with top companies ready to help you take the next step in your career in Tulsa.</p>
          </div>
        </div>
      </section>
    </>)
  }
  return (<>
    <section className='relative h-300 bg-join-hero bg-cover bg-center'>
      <div className='absolute -bottom-100 flex justify-center w-full px-40'>
        <div className='h-240 w-230 px-24 mr-18 flex flex-col rounded-3xl bg-royalBlue'>
          <h1 className='mt-22 text-h1 font-spaceGrotesk font-semibold text-softWhite'>
            Join the InTulsa Talent Network
          </h1>
          <p className='text-ml text-softWhite mt-18'>
            Build your profile with the type of opportunity you want to attract and next exclusively with our network. Receive email alerts that make you first to know about relevant new opportunities, based on your preferences.
          </p>
          <Link
            to={ROUTES.signup}
            className='flex items-center justify-center h-28 w-112 bg-buttonLightBlue mt-22 px-18 rounded-lg'
          >
            <span className='text-softWhite text-ml'>Create an account</span>
          </Link>
        </div>
        <div className='w-210 mt-150 ml-18'>
          <h6 className='text-h6 font-spaceGrotesk font-semibold text-slateGray'>Get Connected in Tulsa</h6>
          <p className='text-slateGray text-ml mt-10 font-light leading-[3.6rem]'>By signing up, you will be able to connect and support you with top companies ready to help you take the next step in your career in Tulsa.</p>
        </div>
      </div>
    </section>
  </>)
