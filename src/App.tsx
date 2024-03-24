import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import EmailVerification from './pages/Authentication/EmailVerification';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit/AuthProvider';
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import {
  FE_AUTH_EMAIL_VERIFICATION,
  FE_AUTH_LOGIN,
  FE_AUTH_REGISTER,
} from './constants/feEndpoint';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'http:',
  });

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AuthProvider store={store}>
        <Routes>
          <Route
            index
            element={
              <RequireAuth fallbackPath={FE_AUTH_LOGIN}>
                <>
                  <PageTitle title="eCommerce Dashboard | Sewa Kendaraan" />
                  <ECommerce />
                </>
              </RequireAuth>
            }
          />
          <Route
            path="/calendar"
            element={
              <>
                <PageTitle title="Calendar | Sewa Kendaraan" />
                <Calendar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | Sewa Kendaraan" />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | Sewa Kendaraan" />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | Sewa Kendaraan" />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables | Sewa Kendaraan" />
                <Tables />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | Sewa Kendaraan" />
                <Settings />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | Sewa Kendaraan" />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | Sewa Kendaraan" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | Sewa Kendaraan" />
                <Buttons />
              </>
            }
          />
          <Route
            path={FE_AUTH_LOGIN}
            element={
              <>
                <PageTitle title="Login | Sewa Kendaraan" />
                <SignIn />
              </>
            }
          />
          <Route
            path={FE_AUTH_REGISTER}
            element={
              <>
                <PageTitle title="Daftar | Sewa Kendaraan" />
                <SignUp />
              </>
            }
          />
          <Route
            path={FE_AUTH_EMAIL_VERIFICATION}
            element={
              <>
                <PageTitle title="Verifikasi Email | Sewa Kendaraan" />
                <EmailVerification />
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
