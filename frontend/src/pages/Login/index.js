import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import FormInput from '../../components/FormInput';

import API from '../../services/API';
import AuthService from '../../services/auth';

export default function Login() {
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    const res = await API.post(ROUTES.APIlogin, {
      email: email.value,
      password: password.value,
    });

    if ( res.data.result ) {
      AuthService.login(res.data.token);
    } else {
      setError(res.data.error);
    }
  };

  const renderError = () => {
    if ( error ) {
      return ( <div className='text-error mb-4'>{error}</div> )
    }
  }

  return (
    <section className='-mt-18 flex flex-col items-center pb-14 bg-login-page-hero bg-no-repeat bg-top bg-[length:auto_34rem] vw-640:bg-[length:auto_48rem] vw-900:bg-[length:100%_auto]'>
      <div className='w-full flex flex-col items-center'>
        {/* Shapes */}
        <div className='relative h-24 w-26 mt-20 vw-900:mt-26 vw-1280:mt-34'>
          <div className='absolute top-0 right-0 h-9 w-9 bg-orangeHeroOverlay' />
          <div className='absolute bottom-0 left-0 h-14 w-14 bg-magenta' />
        </div>
        {/* Header */}
          <h1 className='font-spaceGrotesk text-white text-xl vw-768:text-h5 vw-1280:text-h2'>InTulsa Talent Network</h1>
        </div>
        {/* Login Form */}
        <form
          className='w-[84%] vw-640:w-250 rounded-3xl border border-midGrey border-solid bg-white mt-22 px-16 vw-1280:px-24'
          onSubmit={(e) => handleSubmit(e)}
        >
          <h4 className='w-full text-xl vw-640:text-h4 text-charcoal font-spaceGrotesk font-semibold mt-14 text-center'>Welcome back!</h4>
          <div className='flex vw-640:justify-center items-center mb-12 mt-12'>
            <span className='text-sm vw-640:text-ml text-charcoal vw-640:mx-3'>Need an Account?</span>
            <Link
              to={ROUTES.signup}
              className='text-sm vw-640:text-ml text-royalBlue underline mx-3'
            >
              Sign-up here
            </Link>
          </div>
          { renderError() }
          <FormInput
            type='text'
            name='email'
            label='Login Email'
          />
          <FormInput
            type='password'
            name='password'
            label='Password'
          />
          <div className='flex justify-between items-center vw-640:items-end mb-22 gap-[10px]'>
            <button
              className='h-20 vw-640:h-24 bg-royalBlue text-center text-white text-xl tracking-wide px-14 rounded-lg'
              type='submit'
            >
              Login
            </button>
            <Link
              to={ROUTES.accountRecovery}
              className='text-royalBlue text-sm vw-640:text-ml underline'>
              Forgot Password?
            </Link>
          </div>
        </form>
        {/* Assistance call-to-action */}
        <div className='text-sm vw-640:text-ml leading-relaxed mt-8'>
          <span>Need Help? Just ask </span>
          <a
            href='mailto:help@intulsa.com'
            className='text-sm vw-640:text-ml text-royalBlue underline'
          >
            help@intulsa.com
          </a>
        </div>
      </div>
    </section>
  )
