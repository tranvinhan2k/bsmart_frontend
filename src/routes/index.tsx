import { lazy, Suspense } from 'react';

import { Navigate } from 'react-router-dom';

import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';
import { NavigationActionData } from '~/constants';

import { RoutePayload } from '~/models/routes';

const HomePage = lazy(() => import('~/pages/HomePage'));
const AboutUsPage = lazy(() => import('~/pages/AboutUsPage'));
const TestPage = lazy(() => import('~/pages/TestPage'));
const RegisterPage = lazy(() => import('~/pages/RegisterPage'));
const NotFoundPage = lazy(() => import('~/pages/NotFoundPage'));

const routes: RoutePayload[] = [
  {
    path: '/',
    main: () => (
      <Suspense fallback={<LazyLoadingScreen />}>
        <Navigate to={NavigationActionData[0].link} />
      </Suspense>
    ),
  },
  {
    path: `/${NavigationActionData[0].link}`,
    main: () => (
      <Suspense fallback={<LazyLoadingScreen />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: `/${NavigationActionData[1].link}`,
    main: () => (
      <Suspense fallback={<LazyLoadingScreen />}>
        <AboutUsPage />
      </Suspense>
    ),
  },
  {
    path: `/${NavigationActionData[2].link}`,
    main: () => (
      <Suspense fallback={<LazyLoadingScreen />}>
        {/* // TODO: add course */}
      </Suspense>
    ),
  },
  {
    path: `/${NavigationActionData[3].link}`,
    main: () => (
      <Suspense fallback={<LazyLoadingScreen />}>
        {/* // TODO: add teacher */}
      </Suspense>
    ),
  },
  {
    path: `/${NavigationActionData[4].link}`,
    main: () => (
      <Suspense fallback={<LazyLoadingScreen />}>
        {/* // TODO: add teacher */}
      </Suspense>
    ),
  },
  {
    path: `/${NavigationActionData[5].link}`,
    main: () => (
      <Suspense fallback={<LazyLoadingScreen />}>
        {/* // TODO: add teacher */}
      </Suspense>
    ),
  },
  {
    path: `/${NavigationActionData[6].link}`,
    main: () => (
      <Suspense fallback={<LazyLoadingScreen />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    main: () => (
      <Suspense fallback={<LazyLoadingScreen />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: '/test_page',
    main: () => (
      <Suspense fallback={<LazyLoadingScreen />}>
        <TestPage />
      </Suspense>
    ),
  },
];

export default routes;
