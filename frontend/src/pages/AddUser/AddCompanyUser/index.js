import { useState } from 'react';
import PropTypes from 'prop-types';
import Flag from '../../../assets/icons/flag.svg';
import Search from '../../../assets/icons/search-gray.svg';
import { useGetCompanies } from '../../../hooks/queries/useGetCompanies';
import { useGetClientContacts } from '../../../hooks/queries/useGetClientContacts';
import CompanyContactList from './CompanyContactList';

const ITEMS_PER_PAGE = 10;

export default function AddCompanyUser() {
  const [search, setSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const selectedCompanyId = selectedCompany?.id.split('-')[1] || null; // id is in format 'bl-1234', only need the '1234' for API call

  const { companies, isLoading: isLoadingCompanies } = useGetCompanies({ filterKey: 'name', filterValue: search, count: ITEMS_PER_PAGE, page: 1, enabled: !!search });
  const { clientContacts, isLoading: isLoadingContacts } = useGetClientContacts({ filterKey: 'clientCorporation', filterValue: selectedCompanyId, count: 50, enabled: !!selectedCompany });

  function handleCompanyClick(company) {
    setSelectedCompany(company);
    setSearch(company.name);
  }

  const paragraphStyles = 'opacity-70 mb-8';
  let titleStyles = 'font-spaceGrotesk items-center text-md vw-900:text-xl mb-8 ';
  let containerStyles = 'border-solid border-2 border-neutral-300 remove-outline rounded-3xl py-12 px-6 vw-900:px-14 ';

  return (
    <div className='flex flex-col'>
      <div className={ containerStyles + 'bg-sky-100'}>
        <h2 className={ titleStyles + 'text-royalBlue flex'}>
          <img
            src={Flag}
            alt='flag icon'
            className='w-12 h-12 mr-6'
          />
          Step 1: Add Company in Getro or Bullhorn
        </h2>
        <p className={paragraphStyles}>At the moment it not possible to add companies in this system. Company profile data is currently pulled from Getro database due to technical limitations.</p>
        <p className={paragraphStyles}><strong>Reminder:</strong> please identify the company point of contact to associate to the company in Getro.</p>
        <div className='flex mt-8'>
          <ExternalLink
            text='Go to Getro'
            href='https://www.getro.com/'
            addClass='mr-8'
          />
          <ExternalLink
            text='Go to Bullhorn'
            href='https://www.bullhorn.com/'
          />
        </div>
      </div>
      <div className={ containerStyles + 'bg-white mt-12'}>
        <h2 className={ titleStyles }>Step 2: Assign Company Contact(s)</h2>
        <label className='opacity-70 text-sm'>Company Name</label>
        <div className='relative'>
          <input
            type='text'
            id='companylookup'
            placeholder='Company lookup'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='placeholder-textBlack text-md bg-lightGrey w-full remove-outline rounded-xl border border-solid border-2 border-netural-400 px-4 py-4 mt-2' />
          <img
            src={Search}
            alt='search icon'
            className='absolute right-6 top-6 h-10 w-10 vw-900:h-12 vw-900:w-12'
          />
          {(search && isLoadingCompanies && !selectedCompany) && <div>Loading...</div>}
          {(companies && search !== selectedCompany?.name) && (
            <div className='absolute top-full w-full bg-white border border-grey300'>
              {companies.map((company) => (
                <div
                  key={company.id}
                  className='border-b border-grey300 px-4 py-4 cursor-pointer hover:bg-royalBlue hover:text-white'
                  onClick={() => handleCompanyClick(company)}
                >
                  {company.name}
                </div>
              ))}
            </div>
          )}
          {selectedCompany && (
// Temp comment
            <CompanyContactList
              clientContacts={clientContacts}
              isLoadingContacts={isLoadingContacts}
              selectedCompany={selectedCompany}
            />
          )}
        </div>
      </div>
    </div>
  )
