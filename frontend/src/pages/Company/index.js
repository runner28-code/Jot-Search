import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../components/LoadingSpinner';
import Header from './Header';
import HeaderMobile from './HeaderMobile';
import { getCompanyById } from '../../services/API';
import { buildCandidateAddress } from '../../utils/formatFunctions';
import urlDecode from '../../utils/urlDecode';
import OtherCareers from '../../features/OtherCareers';
import DetailsHeader from '../../components/DetailsHeader';
import InviteCandidates from './InviteCandidates';
import DashboardPublicMin from '../../components/DashboardPublicMin';
import AuthService from '../../services/auth';
import useWindowDimensions from '../../hooks/windowDimensions';


export default function Company() {
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const [companyData, setCompanyData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const companyFromApi = await getCompanyById(id);
    setCompanyData(companyFromApi.company);
    setLoading(false);
  }, []);

  const stylesObject = {
    headerRowStyles: 'flex mb-4 ',
    headerIconStyles: 'h-12 w-12 mr-3',
    headerRowTextStyles: 'text-xl font-bold text-black70%',
    sectionHeaderStyles: 'font-bold text-h4 text-black70% mb-12 ',
    sectionHeaderStylesMobile: 'font-bold text-[3rem] text-black70% mb-2 ',
    hrStyles: 'mb-16 '
  }

  // Format data
  companyData.name = urlDecode(companyData.name);
  if ( companyData.name.includes('(mc)') ) { // Remove (mc) from companyData.name if exists
    companyData.name = companyData.name.toString().replace(' (mc)', '');
  }
  if ( companyData.businessSectorList && companyData.businessSectorList.length > 0 ) {
    companyData.businessSectorList = companyData.businessSectorList.toString().replace(',', ', '); // Add space after commas
  }
  companyData.address = buildCandidateAddress(companyData);
  companyData.employeeString = companyData.numEmployees ? `${companyData.numEmployees} Employees` : 'N/A';
  companyData.fundingString = companyData.funding === 'not applicable' ? 'Funding N/A' : companyData.funding;
  companyData.description = companyData.getro_description ? companyData.getro_description : companyData.bh_description;

  const loggedIn = AuthService.loggedIn();

  const navigate = useNavigate();

  if (loading) { return <LoadingSpinner /> }
  return (
    <div className={ loggedIn ? 'vw-1280:pr-12 mx-[5%]' : ''}>
      <RenderHeader
        type='company'
        loggedIn={loggedIn}
      />
      <div 
        className={ width <= 990 ? 'px-[5%]'
          : !loggedIn ? 'px-[15%]' 
            : ''}
      >
        <div className={ width >= 990 ? 'bg-white p-16 mt-8 border-2 border-midGrey border-solid rounded-3xl relative' : 'bg-white p-4 mt-8 border-2 border-midGrey border-solid rounded-3xl relative'}>
          {/* Header */}
          { width >= 990 ?
            <Header
              companyData={companyData}
              handleCompanyUpdate={setCompanyData}
            />
            : <HeaderMobile
              companyData={companyData}
              handleCompanyUpdate={setCompanyData}
            />
          }
          <hr className={stylesObject.hrStyles + 'mt-4'} />
          {/* Summary */}
          <div className='p-6'>
            <h4 className={ width >= 990 ? stylesObject.sectionHeaderStyles : stylesObject.sectionHeaderStylesMobile }>About {companyData.name}</h4>
            { renderCompanyDescription(companyData.companyDescription, 'text-md mb-10 leading-[32px]') }
          </div>
          { renderSectorList(companyData, width, stylesObject) } 
          <hr className={stylesObject.hrStyles + 'mt-4'} />
          {/* Funding */}
          <div className='p-6'>
            <h4 className={ width >= 990 ? stylesObject.sectionHeaderStyles : stylesObject.sectionHeaderStylesMobile }>Funding</h4>
            { renderCompanyDescription(companyData.funding, 'text-md mb-10 leading-[32px]') }
          </div>          
        </div>
        <div className='mt-12'>
          <OtherCareers
            companyId={companyData.id}
            companyName={companyData.name}
          />
        </div>
        <div className='mt-12'>
          <button
            className='border border-2 border-royalBlue text-royalBlue py-6 px-20 text-lg rounded-xl mb-12'
            onClick={() => navigate(-1)}
          >
          Back
          </button>
        </div>
        <RenderInvite
          loggedIn={loggedIn}
          companyData={companyData}
        />
      </div>
    </div>
  )
}
Company.propTypes = {
  companyDescription: PropTypes.string
}

function RenderHeader({type, loggedIn}) {
  if( loggedIn ) {
    return(<>
      <DetailsHeader type='company' />
    </>)
  }
  return (
    <DashboardPublicMin type={type} />
  )
}
RenderHeader.propTypes = {
  loggedIn: PropTypes.bool,
  type: PropTypes.string
}

function RenderInvite(loggedIn, companyData) {
  const role = AuthService.getUserRole();
  if( loggedIn && role === 'coordinator' ) {
    return(<>
      <InviteCandidates company={companyData} />
    </>)
  }
  return null
}
RenderInvite.propTypes = {
  loggedIn: PropTypes.bool,
  companyData: PropTypes.object
}

// Temp comment
function renderCompanyDescription(description, textStyles) {

  const lorem = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

  if( !description ) {
    return (<>
      <p className={textStyles}>{lorem}</p>
    </>)
  }
  return (
    <div className={textStyles}>
      {description}
    </div>
  )
