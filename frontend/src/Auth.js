import { Routes, Route, Navigate } from 'react-router-dom';
import {
  ActiveCareers,
  AddUser,
  Applications,
  Candidate,
  Candidates,
  Dashboard,
  Favorites,
  Logout,
  Profile,
} from './pages';
import AuthService from './services/auth';
import * as ROUTES from './routes';


export default function Auth() {
  if (!AuthService.loggedIn()) {
    return <Navigate to={ROUTES.landingPage} />
  }

  return ( 
    <div className='vw-640:pl-20 vw-640:pr-20 vw-1280:pl-0'>
      <Routes>
        <Route
          path='/'
          element={<Dashboard />} 
        />
        <Route
          path={ROUTES.profile}
          element={<Profile />} />
        <Route
          path={ROUTES.logout}
          element={<Logout />} />
        <Route
          path={`${ROUTES.candidates}/:id`}
          element={<Candidate />} />
        <Route
          path={ROUTES.applications}
          element={<Applications />} />
        <Route
          path={ROUTES.favorites}
          element={<Favorites />} />
        <Route
          path={ROUTES.activeCareers}
          element={<ActiveCareers />} />
        <Route
          path={ROUTES.candidates}
          element={<Candidates />} />
        <Route
          path={ROUTES.addUser}
          element={<AddUser />} />
      </Routes>
// Temp comment
    </div>
  )
