import { Routes, Route, Navigate } from 'react-router-dom';
import * as ROUTES from './routes';
import Auth from './Auth';
import {
  LandingPage,
  SignUp,
  Login,
  Career,
  Careers,
  Company,
  Companies,
  AccountRecovery,
  ResetPassword,
  Apply
} from './pages';
import { NavBar, Footer, SideNav } from './components';
import AuthService from './services/auth';

function App() {
  let userRole = AuthService.getUserRole();

  return (
    <div className="App overflow-hidden">
      <NavBar />
      <main className='bg-lightGrey pt-30 vw-1280:pt-44 vw-1280:flex'>
        <SideNav userType={userRole} />
        <div 
          className='grow min-h-280 pb-18'>
          <Routes>
            <Route
              path={ROUTES.signup}
              element={<SignUp />} />
            <Route
              path={ROUTES.login}
              element={<Login />} />
            <Route
              path={ROUTES.landingPage}
              element={<LandingPage />} />
            <Route
              path={ROUTES.careers}
              element={<Careers />} />
            <Route
// Temp comment
              path={ROUTES.companies}
              element={<Companies />} />
            <Route
              path={`${ROUTES.careers}/:id`}
              element={<Career />} />
            <Route
              path={`${ROUTES.apply}/:id`}
              element={<Apply />} />
            <Route
              path={`${ROUTES.companies}/:id`}
              element={<Company />} />
            <Route
              path={ROUTES.accountRecovery}
              element={<AccountRecovery />} />
            <Route
              path={ROUTES.resetPassword}
              element={<ResetPassword />} />
            <Route
              path={ROUTES.root + '*'}
              element={<Auth />} />
            <Route
              path="*"
              element={<Navigate to={ROUTES.landingPage} />}
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
