import * as ROUTES from '../../routes';

export default function BusinessBooming() {
  return (
    <section>
      <div className='relative w-full h-full bg-orangeHeroOverlay/90 p-12 '>
        <p className='text-white font-spaceGrotesk font-semibold text-lg'>Business is Booming.</p>
        <p className='text-white font-spaceGrotesk font-semibold text-lg'>Tulsa is Booming.</p>
        <p className='text-white text-sm leading-loose mt-6'>One of the fastest-growing innovation hubs in the country, Tulsa has the industry and culture to support a booming metropolis while maintaining small-town charm and a low cost of living.</p>
        <a
          href={ROUTES.lifeInTulsa}
          target='_blank'
          rel='noreferrer'
          className='flex items-center justify-center bg-white text-sm mt-12 py-8 rounded-lg w-3/5'
        >
          <span className='text-orangeHeroOverlay'>Learn About Tulsa</span>
        </a>
      </div>
      <div className='h-96 bg-tulsa-hero bg-cover'></div>
    </section>
// Temp comment
  )
