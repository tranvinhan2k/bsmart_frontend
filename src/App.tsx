import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import React, { Suspense, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Stack, ThemeProvider } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProSidebarProvider } from 'react-pro-sidebar';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  useDispatchGetAllCategories,
  useDispatchGetAllDayOfWeeks,
  useDispatchGetAllSlots,
  useDispatchGetAllSubjects,
  useDispatchGetCart,
  useDispatchNotifications,
  useDispatchProfile,
} from './hooks';

import defaultTheme from '~/themes';

import store from '~/redux/store';
import { selectRole, selectToken } from '~/redux/user/selector';

import MainLayout from '~/layouts/MainLayout';
import AdminProfileLayout from '~/layouts/AdminProfileLayout';
import ManagerProfileLayout from '~/layouts/ManagerProfileLayout';

import { Color } from './assets/variables';

import { adminRoutes, managerRoutes, routes } from '~/routes';

import { RoutePayload } from '~/models/routes';
import { Role } from './models/role';

import localEnvironment from './utils/localEnvironment';

import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';

import AuthorizePage from '~/pages/AuthorizePage';
// css
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import NotificationContextProvider from './HOCs/context/NotificationContext';
import { useSocket } from './hooks/useSocket';
import { isLoaded } from './redux/globalData/selector';

window.global ||= window;

const showAdminRoutes = () => {
  return adminRoutes.map((route: RoutePayload) => (
    <Route key={route.path} path={route.path} element={route?.main()} />
  ));
};
const showManagerRoutes = () => {
  return managerRoutes.map((route: RoutePayload) => (
    <Route key={route.path} path={route.path} element={route?.main()} />
  ));
};

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

      if (currentRole === 'ROLE_STUDENT' || currentRole === 'ROLE_TEACHER') {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Navigate to="/homepage" />}
          />
        );
      }

      if (currentRole === null) {
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
  const role = useSelector(selectRole);
  const token = useSelector(selectToken);

  const getUserCart = useDispatchGetCart();
  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();
  const { handleUpdateSubjects } = useDispatchGetAllSubjects();
  const { handleUpdateCategories } = useDispatchGetAllCategories();
  const { handleUpdateDayOfWeeks } = useDispatchGetAllDayOfWeeks();
  const { handleUpdateSlots } = useDispatchGetAllSlots();
  const { handleDispatch: handleUpdateNotifications } =
    useDispatchNotifications();
  const selectIsLoaded = useSelector(isLoaded);

  useSocket();

  useEffect(() => {
    async function initGlobalValue() {
      if (token) {
        await handleDispatchProfile();
        await getUserCart.handleDispatch();
        await handleUpdateNotifications();
      }
      await handleUpdateSubjects();
      await handleUpdateCategories();
      await handleUpdateDayOfWeeks();
      await handleUpdateSlots();
    }

    if (!selectIsLoaded) {
      initGlobalValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectIsLoaded]);

  return (
    <Suspense fallback={<LazyLoadingScreen />}>
      <ToastContainer />
      <NotificationContextProvider>
        {role === 'ROLE_ADMIN' && Boolean(token) && (
          <AdminProfileLayout>
            <Routes>{showAdminRoutes()}</Routes>
          </AdminProfileLayout>
        )}
        {role === 'ROLE_MANAGER' && Boolean(token) && (
          <ManagerProfileLayout>
            <Routes>{showManagerRoutes()}</Routes>
          </ManagerProfileLayout>
        )}
        {role !== 'ROLE_ADMIN' && role !== 'ROLE_MANAGER' && (
          <MainLayout>
            <Routes>{showRoutes(role)}</Routes>
          </MainLayout>
        )}
      </NotificationContextProvider>
    </Suspense>
  );
}

const queryClient = new QueryClient();

function Wrapper() {
  return (
    <GoogleOAuthProvider clientId={localEnvironment.GOOGLE_CLIENT_KEY}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ProSidebarProvider>
                  <React.StrictMode>
                    <Stack
                      sx={{ background: Color.white4, minHeight: '100vh' }}
                    >
                      <App />
                    </Stack>
                  </React.StrictMode>
                </ProSidebarProvider>
              </LocalizationProvider>
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default Wrapper;
