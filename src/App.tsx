import { ThemeProvider } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import store from '~/redux/store';
import defaultTheme from '~/themes';
import './App.css';
import MainLayout from '~/layouts/MainLayout';
import routes from '~/routes';
import { RoutePayload } from '~/models/routes';
import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
const showRoutes = () => {
  let result = null;

  if (routes.length > 0) {
    result = routes.map((route: RoutePayload) => {
      return (
        <Route key={route.path} path={route.path} element={route?.main()} />
      );
    });
  }

  return result;
};

function App() {
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
        <Routes>{showRoutes()}</Routes>
      </MainLayout>
    </Suspense>
  );
}

const queryClient = new QueryClient();

function Wrapper() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_KEY}>
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
