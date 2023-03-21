import Stack from '@mui/material/Stack';
import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

import {
  MemberNavigationActionData,
  MentorNavigationActionData,
  NavigationActionData,
} from '~/constants';

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
const FeedbackPage = lazy(() => import('~/pages/FeedbackPage'));
const MentorProfilePage = lazy(() => import('~/pages/MentorProfilePage'));
const MentorEditProfilePage = lazy(
  () => import('~/pages/MentorEditProfilePage')
);
const MentorIntroduceProfilePage = lazy(
  () => import('~/pages/MentorIntroduceProfilePage')
);
const MentorCourseListPage = lazy(() => import('~/pages/MentorCourseListPage'));
const MentorCreateCoursePage = lazy(
  () => import('~/pages/MentorCreateCoursePage')
);
const MentorContractPage = lazy(() => import('~/pages/MentorContractPage'));
const MemberProfilePage = lazy(() => import('~/pages/MemberProfilePage'));

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
    path: `/${NavigationActionData[3].link}/*`,
    main: () => <MentorProfilePage />,
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
    path: `/${NavigationActionData[13].link}/*`,
    main: () => <MemberProfilePage />,
  },
  {
    path: `/${NavigationActionData[14].link}`,
    main: () => <FeedbackPage />,
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
export const memberRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => <MemberDetailsPage />,
  },
  {
    path: `/${MemberNavigationActionData[0].link}`,
    main: () => <EditMemberProfilePage />,
  },
  {
    path: `/${MemberNavigationActionData[1].link}`,
    main: () => <WalletManagementPage />,
  },
  {
    path: `/${MemberNavigationActionData[2].link}`,
    main: () => <WithdrawPage />,
  },
];
export const mentorRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => (
      <Navigate
        to={`/${NavigationActionData[3].link}/${MentorNavigationActionData[0].link}`}
      />
    ),
  },
  {
    path: `/${MentorNavigationActionData[0].link}`,
    main: () => <MentorEditProfilePage />,
  },
  {
    path: `/${MentorNavigationActionData[1].link}`,
    main: () => <WalletManagementPage />,
  },
  {
    path: `/${MentorNavigationActionData[2].link}`,
    main: () => <WithdrawPage />,
  },
  {
    path: `/${MentorNavigationActionData[3].link}`,
    main: () => <MentorCourseListPage />,
  },
  {
    path: `/${MentorNavigationActionData[4].link}`,
    main: () => <MentorCreateCoursePage />,
  },
  {
    path: `/${MentorNavigationActionData[5].link}`,
    main: () => <MentorIntroduceProfilePage />,
  },
  {
    path: `/${MentorNavigationActionData[6].link}`,
    main: () => <MentorContractPage />,
  },
];

export default routes;
