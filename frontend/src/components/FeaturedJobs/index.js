import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useGetJobs } from '../../hooks/queries/useGetJobs';
import { VscBriefcase as CareerIcon } from 'react-icons/vsc';
import useWindowDimensions from '../../hooks/windowDimensions';

const ITEMS_PER_PAGE = 4;

export default function FeaturedJobs() {
  const { width } = useWindowDimensions();

  const linkStyles = '';
  const linkStylesMobile = 'basis-full mb-8'
  const titleStyles = 'text-h4 font-semibold font-spaceGrotesk';
  const titleStylesMoible = 'text-h4 font-semibold font-spaceGrotesk text-center';
  const cardStyles = 'mx-8 outline outline-1 outline-neutral-300 rounded-xxl p-12 w-[275px] h-[316px]';
  const cardStylesMobile = 'mx-8 outline outline-1 outline-neutral-300 rounded-xl py-6 px-4 flex items-center';
  const cardContentStyles = '';
  const cardContentStylesMobile = 'ml-8';
  const cardContentTitle = 'font-spaceGrotesk text-lg mb-6';
  const cardContentTitleMobile = 'font-spaceGrotesk font-semibold text-md mb-6';
  const cardContentSubtitle ='font-spaceGrotesk text-royalBlue text-sm uppercase';
  const cardContentSubtitleMobile ='font-spaceGrotesk text-royalBlue text-xs uppercase';
  const viewAllStyles = 'text-center mt-48';
  const viewAllStylesMobile = 'text-center mt-12';

  const filtersArr = [
    {
      key: 'featured',
      value: true
    }
  ];

  const { jobs, isLoading }= useGetJobs({ filtersArr, count: ITEMS_PER_PAGE});

  return(
    <section className='py-48 bg-neutral-100 flex flex-col flex-wrap items-center'>
      { renderColorShapes() }
      <h2 className={ width >= 990 ? titleStyles : titleStylesMoible }>Featured Opportunities</h2>
      <div className='flex mt-12 flex-wrap'>
        {
          isLoading ?
            <LoadingSpinner />
            :
// Temp comment
            jobs.map((career, index) => {
              const categoryString = career.category?.name.toUpperCase() || 'CATEGORY N/A';
              return(
                <Link
                  to={`${ROUTES.careers}/${career.id}`}
                  key={index}
                  className={ width >= 990 ? linkStyles : linkStylesMobile }
                >
                  <div className={ width >= 990 ? cardStyles : cardStylesMobile }>
                    { width >= 990 ? <RenderImage image={career.logo} /> : <RenderImageMobile image={career.logo} />}
                    <div className={width >= 990 ? cardContentStyles : cardContentStylesMobile}>
                      <h5 className={ width >= 990 ? cardContentTitle : cardContentTitleMobile }>{career.title}</h5>
                      <p className={ width >= 990 ? cardContentSubtitle : cardContentSubtitleMobile }>{categoryString}</p>
                    </div>
                  </div>
                </Link>
              )
            })
        }
      </div>
      <div className={ width >= 990 ? viewAllStyles : viewAllStylesMobile }>
        <Link
          to={ROUTES.careers}
          className='bg-royalBlue rounded-lg text-lg text-white py-6 px-12'>
          View all
        </Link>
      </div>
    </section>
  )
}

function renderColorShapes() {
  return(
    <div className='relative w-24 mb-8'>
      <div className='bg-indigoSquare w-12 h-12' />
      <div className='bg-cyanSquare bg-cyan-400 top-[-20px] right-[5px] absolute w-6 h-6' />
    </div>
  )
}


function RenderImage({image}) {
  const containerStyles = 'w-48 h-48 mb-6 ';
  const iconStyles = 'w-full h-full ';
  if( !image ) {
    return(<>
      <div className={ containerStyles + 'outline outline-1 outline-neutral-300 p-8' }>
        <CareerIcon className={iconStyles + ' fill-royalBlue object-fill'} />
      </div>
    </>)
  }
  return(
    <div className={containerStyles}>
      <img
        src={image}
        className={iconStyles}
      />
    </div>
  )
