import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TimeframeFilter from '../../components/TimeframeFilter';
import { BsArrowUpSquare, BsArrowDownSquare } from 'react-icons/bs';
import { getCompanyQuickStats, getCoordinatorQuickStats } from '../../services/API';

const statFilterChoices = [
  'Today',
  'Last 7 Days',
  'Last 14 Days',
  'Last 30 Days',
  'Last 90 Days'
];

export default function Stats({ userType }) {
  const [timeframe, setTimeframe] = useState(statFilterChoices[3]);
  const [stats, setStats] = useState({});

  function handleFilterChange(choice) {
// Temp comment
    setTimeframe(choice);
