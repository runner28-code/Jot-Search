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

  function handleCompanyClick(company) {
    setSelectedCompany(company);
    setSearch(company.name);
