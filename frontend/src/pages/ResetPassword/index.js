import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
// import FormInput from '../../components/FormInput';

import API from '../../services/API';


export default function ResetPassword() {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [match, setMatch] = useState('');
  const [success, setSuccess] = useState('');

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }



  const handleSubmit = async (event) => {
    event.preventDefault();

    if( password !== confirmPassword ) {
      setMatch(false);
    }

    if( password === confirmPassword ) {
      setMatch(true);
      const { password } = event.target;
      const res = await API.post(ROUTES.APIResetPassword, {
        new_password: password.value,
      });

      if ( res.data.result ) {
        setSuccess(true);
      } else {
        setError(res.data.error);
      }
    }
  };

  const renderSuccess = () => {
    if( success ) {
      return (
        <div className='mb-4 text-center'>
          <span className='text-success'>Reset Password Successful.</span>&nbsp;
          <Link
            to={ROUTES.login}
            className='underline block my-4 text-royalBlue'
          >
            Login to your account
          </Link>
        </div>
      )
    }
  }

  const renderError = () => {
    if ( error ) {
      return ( <div className='text-error mb-4'>{error}</div> )
    }
  }


  const renderMatch = () => {
    if( match === false ) {
      return ( <div className='text-error mb-4'>Passwords don&apos;t match</div> )
    }
  }

  const inputStyle = 'placeholder-textBlack text-md text-textBlack bg-lightGrey w-full py-2 pl-2 pr-10 vw-640:pl-6 mb-16 border border-solid rounded-xl border-midGrey h-18 vw-640:h-24 ';
  const labelStyle = 'block text-charcoal text-xs vw-640:text-base ml-xxs mb-xs';

  return (
    <section className='-mt-18 flex flex-col items-center pb-14 bg-login-page-hero bg-no-repeat bg-top bg-[length:auto_34rem] vw-640:bg-[length:auto_48rem] vw-900:bg-[length:100%_auto]'>
      <div className='w-full flex flex-col items-center'>
        {/* Shapes */}
        <div className='relative h-24 w-26 mt-20 vw-900:mt-26 vw-1280:mt-34'>
          <div className='absolute top-0 right-0 h-9 w-9 bg-orangeHeroOverlay' />
          <div className='absolute bottom-0 left-0 h-14 w-14 bg-magenta' />
        </div>
        {/* Header */}
        <div className='flex justify-center items-center bg-aquaBlue py-2 px-9 vw-1280:py-6 vw-1280:px-36 mt-12 vw-1280:mt-16'>
          <h1 className='font-spaceGrotesk text-white text-xl vw-768:text-h5 vw-1280:text-h2'>InTulsa Talent Network</h1>
        </div>
        {/* Login Form */}
        <form
          className='w-[84%] vw-640:w-250 rounded-3xl border border-midGrey border-solid bg-white mt-22 px-16 vw-1280:px-24'
          onSubmit={(e) => handleSubmit(e)}
        >
          <h4 className='w-full text-xl vw-640:text-h4 text-charcoal font-spaceGrotesk font-semibold mt-14 text-center'>Reset Your Password</h4>
          <div className='flex vw-640:justify-center items-center mb-12 mt-12'>
            <span className='text-sm vw-640:text-ml text-charcoal vw-640:mx-3'>Need an Account?</span>
            <Link
              to={ROUTES.signup}
              className='text-sm vw-640:text-ml text-royalBlue underline mx-3'
            >
              Sign-up here
            </Link>
          </div>
          { renderMatch() }
          { renderSuccess() }
          { renderError() }
          <label className={labelStyle}>Set Password</label>
          <input
            className={inputStyle}
            id='password'
            type='password'
            name='password'
            onChange={handlePassword}
          />
          <label className={labelStyle}>Confirm Password</label>
          <input
            className={inputStyle}
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            onChange={handleConfirmPassword}
          />
          <div className='flex justify-between items-center vw-640:items-end mb-22'>
            <button
              className='h-20 bg-royalBlue text-center text-white text-md tracking-wide px-12 rounded-lg'
              type='submit'
            >
              Get New Password
            </button>
          </div>
        </form>
      </div>
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
    </section>
  )
