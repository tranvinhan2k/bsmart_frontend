import Stack from '@mui/material/Stack';
import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

import { NavigationActionData } from '~/constants';

import { RoutePayload } from '~/models/routes';
import CoursesPage from '~/pages/CoursesPage';

const TestPage = lazy(() => import('~/pages/TestPage'));
const RegisterPage = lazy(() => import('~/pages/RegisterPage'));
const NotFoundPage = lazy(() => import('~/pages/NotFoundPage'));
const HomePage = lazy(() => import('~/pages/HomePage'));
const AboutUsPage = lazy(() => import('~/pages/AboutUsPage'));
const LoginPage = lazy(() => import('~/pages/LoginPages'));

const routes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to={NavigationActionData[0].link} />,
  },
  {
    path: `/${NavigationActionData[0].link}`,
    main: () => <HomePage />,
  },
  {
    path: `/${NavigationActionData[1].link}`,
    main: () => <AboutUsPage />,
  },
  {
    path: `/${NavigationActionData[2].link}`,
    main: () => <CoursesPage />,
  },
  {
    path: `/${NavigationActionData[3].link}`,
    main: () => <Stack>Hello</Stack>,

    /* // TODO: add teacher */
  },
  {
    path: `/${NavigationActionData[4].link}`,
    main: () => <Stack>Hello</Stack>,

    /* // TODO: add teacher */
  },
  {
    path: `/${NavigationActionData[5].link}`,
    main: () => <Stack>Hello</Stack>,

    /* // TODO: add teacher */
  },
  {
    path: `/${NavigationActionData[6].link}`,
    main: () => <RegisterPage />,
  },
  {
    path: `/${NavigationActionData[7].link}`,
    main: () => <LoginPage />,
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
  },
  {
    path: '/test_page',
    main: () => <TestPage />,
  },
];

export default routes;
