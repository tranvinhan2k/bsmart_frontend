import { ThemeProvider } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProSidebarProvider } from 'react-pro-sidebar';
import store from '~/redux/store';
import defaultTheme from '~/themes';
import MainLayout from '~/layouts/MainLayout';
import routes, { adminRoutes } from '~/routes';
import { RoutePayload } from '~/models/routes';
import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';
// css
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import localEnvironment from './utils/localEnvironment';
import { Role } from './models/role';
import { selectProfile, selectRole } from './redux/user/selector';
import AuthorizePage from './pages/AuthorizePage';
import { useDispatchGetCart, useMutationProfile } from './hooks';
import { addProfile } from './redux/user/slice';

const showRoutes = (currentRole: Role | null) => {
  let result = null;

  if (routes.length > 0) {
    result = routes.map((route: RoutePayload) => {
      if (route.role.length === 0) {
        return (
          <Route key={route.path} path={route.path} element={route?.main()} />
        );
      }
      if (currentRole !== null && route.role.includes(currentRole)) {
        return (
          <Route key={route.path} path={route.path} element={route?.main()} />
        );
      }
      if (currentRole === null && route.role.includes('GUEST')) {
        return (
          <Route key={route.path} path={route.path} element={route?.main()} />
        );
      }
      if (currentRole === 'STUDENT' || currentRole === 'TEACHER') {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Navigate to="/homepage" />}
          />
        );
      }
      if (currentRole === 'GUEST') {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<AuthorizePage />}
          />
        );
      }

      return (
        <Route key={route.path} path={route.path} element={route?.main()} />
      );
    });
  }

  return result;
};

function App() {
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const profile = useSelector(selectProfile);
  const getProfileMutation = useMutationProfile();

  useEffect(() => {
    async function getProfile() {
      try {
        const responseProfile = await getProfileMutation.mutateAsync();
        dispatch(addProfile({ profile: responseProfile }));
      } catch (error) {
        // toast.notifyErrorToast('Lấy thông tin thất bại. Xin hãy thử lại.');
      }
    }
    if (!profile.id) {
      getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<LazyLoadingScreen />}>
      <ToastContainer />
      <MainLayout>
        <Routes>{showRoutes(role)}</Routes>
      </MainLayout>
    </Suspense>
  );
}

const queryClient = new QueryClient();

function Wrapper() {
  return (
    <ProSidebarProvider>
      <GoogleOAuthProvider clientId={localEnvironment.GOOGLE_CLIENT_KEY}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ThemeProvider theme={defaultTheme}>
              <BrowserRouter>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </BrowserRouter>
            </ThemeProvider>
          </Provider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ProSidebarProvider>
  );
}

export default Wrapper;
