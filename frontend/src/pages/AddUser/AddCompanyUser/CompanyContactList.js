import { useState } from 'react';
// Temp comment
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
