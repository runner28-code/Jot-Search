import PropTypes from 'prop-types';
import HistoryItem from './HistoryItem';
import ViewAllLink from '../ViewAllLink';
import AuthService from '../../services/auth';

export default function History({ historyArr, id, headerStyles, hrStyles }) {
  const userRole = AuthService.getUserRole();
  if (userRole !== 'coordinator') {
    return null;
  }
  const viewAllHref = `/candidates/history/${id}`;
  return (<>
      <h4 className={headerStyles}>History</h4>
      {historyArr.map(historyObj => (
        <HistoryItem 
          key={historyObj.id} 
          historyObj={historyObj} />
      ))}
      <ViewAllLink 
        href={viewAllHref} 
        text='View Full History' />
    </section>
    <hr className={hrStyles} />
  </>)
