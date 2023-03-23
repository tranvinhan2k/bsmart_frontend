import { ThemeProvider } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from '~/redux/store';
import defaultTheme from '~/themes';
import MainLayout from '~/layouts/MainLayout';
import routes from '~/routes';
import { RoutePayload } from '~/models/routes';
import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';
// css
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import localEnvironment from './utils/localEnvironment';
import { Role } from './models/role';
import { selectProfile, selectRole } from './redux/user/selector';
import TestPage from './pages/TestPage';
import AuthorizePage from './pages/AuthorizePage';
import { useMutationProfile } from './hooks';
import toast from './utils/toast';
import { addProfile } from './redux/user/slice';

const showRoutes = (currentRole: Role | null) => {
  let result = null;

  if (routes.length > 0) {
    result = routes.map((route: RoutePayload) => {
      if (
        (route.role === currentRole && Boolean(route.role)) ||
        route.role === undefined
      ) {
        return (
          <Route key={route.path} path={route.path} element={route?.main()} />
        );
      }
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<AuthorizePage role={`${currentRole} ${route.role}`} />}
        />
      );

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
        toast.notifyErrorToast('Lấy thông tin thất bại. Xin hãy thử lại.');
      }
    }
    if (!profile.id) {
      getProfile();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Suspense fallback={<LazyLoadingScreen />}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <MainLayout>
        <Routes>{showRoutes(role)}</Routes>
      </MainLayout>
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
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default Wrapper;
