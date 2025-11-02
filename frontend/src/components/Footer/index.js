import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import intulsaLogo from '../../assets/images/intulsa-logo-white-small.svg';
import intulsaTalentLogo from '../../assets/images/intulsa-talent-white-small.svg';
import intulsaBusinessLogo from '../../assets/images/inTulsa-business-logo-web-white.svg';

import intulsaFooterWhite from '../../assets/images/talent-intulsa-white-small.svg';
import inTulsaFooter from '../../assets/images/intulsa-talent-network.svg';

// Social Icons
import linkedin from '../../assets/icons/social/social_linkedin_grey.svg';
import twitter from '../../assets/icons/social/social_twitter.svg';
import facebook from '../../assets/icons/social/social_facebook.svg';
import instagram from '../../assets/icons/social/social_instagram.svg';
import youtube from '../../assets/icons/social/social_youtube.svg';
import useWindowDimensions from '../../hooks/windowDimensions';

const socialIconStyle = 'w-18 h-18 ml-8';
const socialIconStyleMobile = '';

export default function Footer() {

  const { width } = useWindowDimensions();

  if( width <= 990 ) {
    return (<>
      <div className='flex py-24 px-[5%] items-center justify-center space-x-10 bg-royalBlue'>
        <a href={ROUTES.linkedin}>
          <img
            src={linkedin}
            className={socialIconStyleMobile}
          />
        </a>
        <a href={ROUTES.twitter}>
          <img
            src={twitter}
            className={socialIconStyleMobile}
          />
        </a>
        <a href={ROUTES.facebook}>
          <img
            src={facebook}
            className={socialIconStyleMobile}
          />
        </a>
        <a href={ROUTES.instagram}>
          <img
            src={instagram}
            className={socialIconStyleMobile}
          />
        </a>
        <a href={ROUTES.youtube}>
          <img
            src={youtube}
            className={socialIconStyleMobile}
          />
        </a>
      </div>
      <NavFooterMobile />
      <div
        id='footer'
        className='flex flex-col'
      >
        { width >= 990 ? <SocialStyles /> : <SocialStylesMobile />}
        {/* Copyright / Privacy Policy / TOS */}
        <div className='flex justify-center items-center bg-legal-bg h-28'>
          {/* TODO: Change anchor tag links to correct Privacy Policy and TOS links */}
          <div className='text-grey w-1/2 text-xs text-center'>
            <span>© 2022 Talent inTulsa initiatives, LLC. All rights reserved | </span>
            <a
              href={ROUTES.privacyPolicy}
              className='underline'
              target='_blank'
              rel='noreferrer'
            >
                Privacy Policy
            </a>
            <span> | </span>
            <a
              href={ROUTES.termsOfService}
              className='underline'
              target='_blank'
              rel='noreferrer'
            >
                Terms of Service
            </a>
          </div>
        </div>
      </div>
    </>)
  }

  return (<>
    <NavFooter />
    <div className='flex py-24 px-[15%] items-center justify-center bg-royalBlue'>
      <img
        src={intulsaFooterWhite}
        className='w-56 h-auto mr-18'
      />
      <a href={ROUTES.linkedin}>
        <img
          src={linkedin}
          className={socialIconStyle}
        />
      </a>
      <a href={ROUTES.twitter}>
        <img
          src={twitter}
          className={socialIconStyle}
        />
      </a>
      <a href={ROUTES.facebook}>
        <img
          src={facebook}
          className={socialIconStyle}
        />
      </a>
      <a href={ROUTES.instagram}>
        <img
          src={instagram}
          className={socialIconStyle}
        />
      </a>
      <a href={ROUTES.youtube}>
        <img
          src={youtube}
          className={socialIconStyle}
        />
      </a>
    </div>
    <div
      id='footer'
      className='flex flex-col'
    >
      {/* Social Links */}
      <div className='bg-midGrey flex justify-center items-center'>
        <div className='flex flex-col vw-900:flex-row justify-center items-center gap-[36px] vw-900:gap-[96px] w-full px-24 py-24'>
          {/* Dicover the InTulsa Network */}
          <p className='font-spaceGrotesk text-lightGrey'>DISCOVER THE INTULSA NETWORK</p>
          {/* Links Container */}
          <div className='flex flex-col vw-640:flex-row gap-[35px] vw-1024:gap-[96px]'>
            <a
              href='https://intulsa.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={intulsaLogo}
                alt='Intulsa'
                className='w-auto h-auto'
              />
            </a>
            <a
              href='https://talent.intulsa.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={intulsaTalentLogo}
                alt='Intulsa Talent'
                className='w-auto h-auto'
              />
            </a>
            <a
              href='https://business.intulsa.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={intulsaBusinessLogo}
                alt='Intulsa Logo'
                className='w-auto h-auto'
              />
            </a>
          </div>
        </div>
      </div>
      {/* Copyright / Privacy Policy / TOS */}
      <div className='flex justify-center items-center bg-legal-bg h-28'>
        {/* TODO: Change anchor tag links to correct Privacy Policy and TOS links */}
        <div className='text-grey w-1/2 text-xs text-center'>
          <span>© 2022 Talent inTulsa initiatives, LLC. All rights reserved | </span>
          <a
            href={ROUTES.privacyPolicy}
            className='underline'
            target='_blank'
            rel='noreferrer'
          >
              Privacy Policy
          </a>
          <span> | </span>
          <a
            href={ROUTES.termsOfService}
            className='underline'
            target='_blank'
            rel='noreferrer'
          >
              Terms of Service
          </a>
        </div>
      </div>
    </div>
  </>)
}

function NavFooter() {

  const blueLinkStyle = 'text-md text-royalBlue font-spaceGrotesk font-semibold mb-8';
  const linkStyle = 'text-md zinc-800 mb-4';
  const addressLinkStyle = 'text-md text-zinc-700 mb-6';

  return(<>
    <div className='py-24 px-[10%] flex flex-wrap'>
      <div className='flex flex-col basis-6/12'>
        <img
          src={inTulsaFooter}
          className='w-[250px] h-auto mb-12'
        />
        <Link
          to={ROUTES.signup}
          className={blueLinkStyle}
        >Create Account
        </Link>
        <Link
          to={ROUTES.login}
          className={blueLinkStyle}
        >Login
        </Link>
        <a
          href={ROUTES.mailToIntulsa}
          className={addressLinkStyle}
        >info@talentintulsa.com
        </a>
        <Address />
      </div>
      <div className='flex flex-col basis-3/12'>
        <Link
          to={ROUTES.landingPage}
          className={linkStyle}
        >Home
        </Link>
        <Link
          to={ROUTES.careers}
          className={linkStyle}
        >Find Careers
        </Link>
        <Link
          to={ROUTES.companies}
          className={linkStyle}
        >Browse Companies
        </Link>
        <a
          href={ROUTES.intulsa}
          className={linkStyle}
        >Our Website
        </a>
      </div>
      <div className='flex flex-col basis-3/12'>
        <a
          href="/careers"
          className={linkStyle}
        >
          Software & Enginering Job Openings
        </a>
        <a
          href="/careers"
          className={linkStyle}
        >
          Sales & Business Developement Job Openings
        </a>
        <a
          href="/careers"
          className={linkStyle}
        >
          Operations Job Openings
        </a>
        <a
          href="/careers"
          className={linkStyle}
        >
        </a>
        <a
          href="/careers"
          className={linkStyle}
        >
          Finance Job Openings
        </a>
        <a
          href="/careers"
          className={linkStyle}
        >
          Tulsa Jobs
        </a>
      </div>
    </div>
    <BackToTop />
  </>)
}

function NavFooterMobile() {

  const blueLinkStyle = 'text-sm text-royalBlue font-spaceGrotesk font-semibold mb-4';
  const linkStyle = 'text-sm zinc-800 mb-4';
  const addressLinkStyle = 'text-sm text-zinc-700 mb-6 mt-8';

  return(<>
    <div className='py-24 px-[5%] flex flex-row flex-wrap'>
      <div className='basis-12/12'>
        <img
          src={inTulsaFooter}
          className='h-auto mb-12 w-4/6'
        />
      </div>
      <div className='flex flex-col basis-6/12'>
        <Link
          to={ROUTES.signup}
          className={blueLinkStyle}
        >Create Account
        </Link>
        <Link
          to={ROUTES.login}
          className={blueLinkStyle}
        >Login
        </Link>
        <a
          href={ROUTES.mailToIntulsa}
          className={addressLinkStyle}
        >info@talentintulsa.com
        </a>
        <Address />
      </div>
      <div className='flex flex-col basis-6/12 px-8'>
        <Link
          to={ROUTES.landingPage}
          className={linkStyle}
        >Home
        </Link>
        <Link
          to={ROUTES.careers}
          className={linkStyle}
        >Find Careers
        </Link>
        <Link
          to={ROUTES.companies}
          className={linkStyle}
        >Browse Companies
        </Link>
        <a
          href={ROUTES.intulsa}
          className={linkStyle}
        >Our Website
        </a>
      </div>
      <div className='flex flex-col basis-full mt-12'>
        <a
          href="/careers"
          className={linkStyle}
        >
          Software & Enginering Job Openings
        </a>
        <a
          href="/careers"
          className={linkStyle}
        >
          Sales & Business Developement Job Openings
        </a>
        <a
          href="/careers"
          className={linkStyle}
        >
          Operations Job Openings
        </a>
        <a
          href="/careers"
          className={linkStyle}
        >
          Marketing Job Openings
        </a>
        <a
          href="/careers"
          className={linkStyle}
        >
          Finance Job Openings
        </a>
        <a
          href="/careers"
          className={linkStyle}
        >
          Tulsa Jobs
        </a>
      </div>
    </div>
    <BackToTop />
  </>)
}

function BackToTop() {
  const { width } = useWindowDimensions();

  if( width <= 990 ) {
    return null;
  }
  return(<>
    <div className='text-center'>
      <button
        className='outline outline-2 focus:outline outline-royalBlue rounded-lg text-lg text-royalBlue py-6 px-12 mb-12'
        onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}>Back to Top
      </button>
    </div>
  </>)
}

function Address() {
  const { width } = useWindowDimensions();
  const addressLinkStyle = 'text-md text-zinc-700 mb-6';

  if( width <= 990 ) {
    return null;
  }
  return (<>
    <a
      href={ROUTES.gMapsIntulsa}
      className={addressLinkStyle}
    >
      <p>36 E Cameron St, Tulsa,</p>
      <p>OK, 74103, USA</p>
    </a>
  </>)
}

function SocialStyles() {
  return (
    <div className='bg-midGrey flex justify-center items-center'>
      <div className='flex flex-col vw-900:flex-row justify-center items-center gap-[36px] vw-900:gap-[96px] w-full px-24 py-24'>
        {/* Dicover the InTulsa Network */}
        <p className='font-spaceGrotesk text-lightGrey'>DISCOVER THE INTULSA NETWORK</p>
        {/* Links Container */}
        <div className='flex flex-col vw-640:flex-row gap-[35px] vw-1024:gap-[96px]'>
          <a
            href='https://intulsa.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src={intulsaLogo}
              alt='Intulsa'
              className='w-auto h-auto'
            />
          </a>
          <a
            href='https://talent.intulsa.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src={intulsaTalentLogo}
              alt='Intulsa Talent'
              className='w-auto h-auto'
            />
          </a>
          <a
            href='https://business.intulsa.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src={intulsaBusinessLogo}
              alt='Intulsa Logo'
              className='w-auto h-auto'
            />
          </a>
        </div>
      </div>
    </div>
  )
