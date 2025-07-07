import * as ROUTES from '../../routes';

export default function BusinessBooming() {
  return (
    <section className='mt-150 h-360 bg-tulsa-hero bg-cover bg-center'>
      <div className='relative w-240 max-w-240 h-full bg-orangeHeroOverlay/90 pl-40 pr-30 pt-56 '>
        <p className='text-white font-spaceGrotesk font-semibold text-[7.2rem] leading-tight'>Business is Booming.</p>
        <p className='text-white font-spaceGrotesk font-semibold text-[7.2rem] leading-tight'>Tulsa is Booming.</p>
        <p className='text-white text-ml leading-loose mt-16'>One of the fastest-growing innovation hubs in the country, Tulsa has the industry and culture to support a booming metropolis while maintaining small-town charm and a low cost of living.</p>
// Temp comment
        <a
          href={ROUTES.lifeInTulsa}
          target='_blank'
          rel='noreferrer'
          className='flex items-center justify-center h-28 w-112 bg-white mt-22 px-18 rounded-lg'
        >
          <span className='text-orangeHeroOverlay tracking-wide'>Learn More About Tulsa</span>
        </a>
        {/* Shapes */}
        <div className='absolute bottom-36 -right-18 h-40 w-40 bg-blueSquare2/95' />
        <div className='absolute bottom-80 -right-72 h-36 w-36 bg-blueSquare/95' />
      </div>
    </section>
  )
