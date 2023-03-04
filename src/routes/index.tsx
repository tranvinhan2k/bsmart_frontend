import Stack from '@mui/material/Stack';
import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

import { NavigationActionData } from '~/constants';

import { RoutePayload } from '~/models/routes';

const HomePage = lazy(() => import('~/pages/HomePage'));
const AboutUsPage = lazy(() => import('~/pages/AboutUsPage'));
const LmsPage = lazy(() => import('~/pages/LmsPage'));
const AnnotationPage = lazy(() => import('~/pages/AnnotationPage'));
const BlogPage = lazy(() => import('~/pages/BlogPage'));
const BlogDetailsPage = lazy(() => import('~/pages/BlogDetailsPage'));
const MemberDetailsPage = lazy(() => import('~/pages/MemberDetailsPage'));
const EditMemberProfilePage = lazy(
  () => import('~/pages/EditMemberProfilePage')
);
const WalletManagementPage = lazy(() => import('~/pages/WalletManagementPage'));
const WithdrawPage = lazy(() => import('~/pages/WithdrawPage'));
const TestPage = lazy(() => import('~/pages/TestPage'));
const RegisterPage = lazy(() => import('~/pages/RegisterPage'));
const NotFoundPage = lazy(() => import('~/pages/NotFoundPage'));
const LoginPage = lazy(() => import('~/pages/LoginPages'));
const CoursesPage = lazy(() => import('~/pages/CoursesPage'));
const CourseDetailPage = lazy(() => import('~/pages/CourseDetailPage'));
const BuyCoursePage = lazy(() => import('~/pages/BuyCoursePage'));

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
    main: () => <BlogPage />,
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
    path: `/${NavigationActionData[8].link}`,
    main: () => <CourseDetailPage />,
  },
  {
    path: `/${NavigationActionData[9].link}`,
    main: () => <LmsPage />,
  },
  {
    path: `/${NavigationActionData[10].link}`,
    main: () => <AnnotationPage />,
  },
  {
    path: `/${NavigationActionData[11].link}`,
    main: () => <BuyCoursePage />,
  },
  {
    path: `/${NavigationActionData[12].link}`,
    main: () => <BlogDetailsPage />,
  },
  {
    path: `/${NavigationActionData[13].link}`,
    main: () => <MemberDetailsPage />,
  },
  {
    path: `/${NavigationActionData[14].link}`,
    main: () => <EditMemberProfilePage />,
  },
  {
    path: `/${NavigationActionData[15].link}`,
    main: () => <WalletManagementPage />,
  },
  {
    path: `/${NavigationActionData[16].link}`,
    main: () => <WithdrawPage />,
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
