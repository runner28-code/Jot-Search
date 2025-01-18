import { Link } from 'react-router-dom';
import ExploreSearch from '../../components/ExploreSearch';
import ExploreSearchMobile from '../../components/ExploreSearchMobile';
import ExpertiseLinks from '../../components/ExpertiseLinks';
import ExpertiseLinksMobile from '../../components/ExpertiseLinksMobile';
import JoinTalentNetwork from '../../components/JoinTalentNetwork';
import FeaturedJobs from '../../components/FeaturedJobs';
import FeaturedCompanies from '../../components/FeaturedCompanies';
import FeaturedCompaniesMobile from '../../components/FeaturedCompaniesMobile';
import BusinessBooming from '../../components/BusinessBooming';
import BusinessBoomingMobile from '../../components/BusinessBoomingMobile';
import ColorShapes from '../../components/ColorShapes';
import * as ROUTES from '../../routes';
import { MdLocationOn } from 'react-icons/md';
import { useGetLandingPageStats } from '../../hooks/queries/useGetLandingPageStats';
import useWindowDimensions from '../../hooks/windowDimensions';

// Styles
const heroStyles = 'relative flex flex-col items-center h-135 vw-1024:h-280 vw-1280:h-280 relative z-10 bg-cover bg-center bg-explore-tulsa ';

export default function LandingPage() {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const isDesktop = width >= 1024;

  return (
    <main className='bg-white'>
      {/* Hero */}
      <section className={heroStyles}>
// Temp comment
        {/* Header */}
        <div className='mt-34 vw-1024:mt-60 flex flex-col items-center'>
          { renderLocation() }
          <p className='text-white font-spaceGrotesk font-semibold w-2/3 vw-1024:w-full text-[35.2px] vw-1024:text-[72px] text-center'>{'Find a Career You\'ll Love'}</p>
          { renderColorShapes() }
          { renderJoinTalent() }
        </div>
        { renderSearch() }
      </section>
      {/* Browse Opportunities by Expertise */}
      { renderExpertiseLinks() }
      { isMobile && <JoinTalentNetwork /> }
      {/* Featured Jobs */}
      <FeaturedJobs />
      {/* Featured Companies */}
      { isDesktop ? <FeaturedCompanies /> : <FeaturedCompaniesMobile />}
      { isDesktop && <JoinTalentNetwork /> }
      { isDesktop ? <BusinessBooming /> : <BusinessBoomingMobile />}
    </main>
  )
