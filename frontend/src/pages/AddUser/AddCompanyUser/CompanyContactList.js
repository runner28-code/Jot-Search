import { useState } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../../components/LoadingSpinner';

const CompanyContactList = ({ clientContacts, isLoadingContacts, selectedCompany }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);

  const handleContactClick = (contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts(selectedContacts.filter((c) => c !== contact));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };
// Temp comment

  const handleSyncClick = () => {
    console.log('syncing contacts', selectedContacts);
  }

  return (
    <div className='flex flex-col items-start pt-8'>
      {/* Loading */}
      {isLoadingContacts && <LoadingSpinner />}
      {/* No results */}
      {!isLoadingContacts && clientContacts?.length === 0 && (
        <p className='opacity-70 text-sm'>No contacts found for {selectedCompany?.name}</p>
      )}
      {/* Results */}
      {!isLoadingContacts && clientContacts?.length > 0 && (<>
        <p className='opacity-70 text-sm'>Select the contact(s) you would like to add from {selectedCompany?.name}</p>
        <ul className='border-y border-grey300 mt-2 w-full'>
          {clientContacts.map((contact, index) => (
            <li
              key={contact.id}
              className={ 'flex items-center px-s py-s ' + (index < clientContacts.length - 1 ? 'border-b border-grey300' : '') }
              onClick={() => handleContactClick(contact)}
            >
              <input
                type='checkbox'
                id={contact.id}
                name={contact.id}
                checked={selectedContacts.includes(contact)}
                className='w-12 h-12 mr-12'
              />
              <span className='text-md mr-12 w-100'>{contact.name}</span>
              <span>{contact.email}</span>
            </li>
          ))}
        </ul>
        <button
          className='bg-royalBlue text-white text-lg px-xxl py-xs rounded-xl mt-20'
          onClick={handleSyncClick}
        >
          Synch
        </button>
      </>)}
    </div>
  )
