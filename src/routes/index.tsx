import Stack from '@mui/material/Stack';
import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

import {
  MemberNavigationActionData,
  MentorNavigationActionData,
  NavigationActionData,
} from '~/constants';

import { RoutePayload } from '~/models/routes';
import CartPage from '~/pages/CartPage';
import CheckoutPage from '~/pages/CheckoutPage';

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
const AdminPage = lazy(() => import('~/pages/AdminPage'));
const FeedbackPage = lazy(() => import('~/pages/FeedbackPage'));
const MentorProfilePage = lazy(() => import('~/pages/MentorProfilePage'));
const MentorEditProfilePage = lazy(
  () => import('~/pages/MentorEditProfilePage')
);
const MentorsPage = lazy(() => import('~/pages/MentorsPage'));
const MentorCourseListPage = lazy(() => import('~/pages/MentorCourseListPage'));
const MemberCourseListPage = lazy(() => import('~/pages/MemberCourseListPage'));
const MentorCreateCoursePage = lazy(
  () => import('~/pages/MentorCreateCoursePage')
);
const MentorTakeAttendancePage = lazy(
  () => import('~/pages/MentorTakeAttendancePage')
);
const MentorReTakeAttendancePage = lazy(
  () => import('~/pages/MentorReTakeAttendancePage')
);
const AdminApproveRegisterPage = lazy(
  () => import('~/pages/AdminApproveRegisterPage')
);
const MentorRegisterRequestDetailsPage = lazy(
  () => import('~/pages/MentorRegisterRequestDetailsPage')
);
const AdminProcessCourseCreateRequestPage = lazy(
  () => import('~/pages/AdminProcessCourseCreateRequestPage')
);
const MentorProcessCourseCreateRequestDetailsPage = lazy(
  () => import('~/pages/AdminProcessCourseCreateRequestDetailsPage')
);
const MentorResourceManagePage = lazy(
  () => import('~/pages/MentorResourceManagePage')
);
const MentorQuizSettingsPage = lazy(
  () => import('~/pages/MentorQuizSettingsPage')
);
const MentorContractPage = lazy(() => import('~/pages/MentorContractPage'));
const MemberProfilePage = lazy(() => import('~/pages/MemberProfilePage'));
const AdminProfilePage = lazy(() => import('~/pages/AdminProfilePage'));
const ConfirmEmailPage = lazy(() => import('~/pages/ConfirmEmailPage'));

const routes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to={NavigationActionData[0].link} />,
    role: [],
  },
  {
    path: `/${NavigationActionData[0].link}`,
    main: () => <HomePage />,
    role: [],
  },
  {
    path: `/${NavigationActionData[1].link}`,
    main: () => <AboutUsPage />,
    role: [],
  },
  {
    path: `/${NavigationActionData[2].link}`,
    role: [],
    main: () => <CoursesPage />,
  },
  {
    path: `/${NavigationActionData[3].link}/*`,
    main: () => <MentorProfilePage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${NavigationActionData[4].link}`,
    main: () => <BlogPage />,
    role: [],
  },
  {
    path: `/${NavigationActionData[5].link}`,
    main: () => <Stack>Hello</Stack>,
    role: [],
  },
  {
    path: `/${NavigationActionData[6].link}`,
    main: () => <RegisterPage />,
    role: ['GUEST'],
  },
  {
    path: `/${NavigationActionData[7].link}`,
    main: () => <LoginPage />,
    role: ['GUEST'],
  },
  {
    path: `/${NavigationActionData[8].link}`,
    main: () => <CourseDetailPage />,
    role: ['GUEST', 'ROLE_STUDENT', 'ROLE_TEACHER'],
  },
  {
    path: `/${NavigationActionData[9].link}`,
    main: () => <LmsPage />,
    role: [],
  },
  {
    path: `/${NavigationActionData[10].link}`,
    main: () => <AnnotationPage />,
    role: ['ROLE_STUDENT', 'ROLE_TEACHER'],
  },
  {
    path: `/${NavigationActionData[11].link}`,
    main: () => <BuyCoursePage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `/${NavigationActionData[12].link}`,
    main: () => <BlogDetailsPage />,
    role: ['GUEST', 'ROLE_TEACHER', 'ROLE_STUDENT'],
  },
  {
    path: `/${NavigationActionData[13].link}/*`,
    main: () => <MemberProfilePage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `/${NavigationActionData[14].link}`,
    main: () => <FeedbackPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `/${NavigationActionData[15].link}`,
    main: () => <MentorsPage />,
    role: ['GUEST', 'ROLE_STUDENT'],
  },
  {
    path: `/${NavigationActionData[16].link}`,
    main: () => <CartPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `/${NavigationActionData[17].link}`,
    main: () => <MentorContractPage />,
    role: [],
  },
  {
    path: `/${NavigationActionData[18].link}`,
    main: () => <CheckoutPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `/${NavigationActionData[19].link}`,
    main: () => <ConfirmEmailPage />,
    role: ['ROLE_STUDENT', 'ROLE_TEACHER'],
  },
  {
    path: `/${NavigationActionData[19].link}`,
    main: () => <MentorResourceManagePage />,
    role: ['TEACHER'],
  },
  {
    path: `/${NavigationActionData[20].link}`,
    main: () => <MentorQuizSettingsPage />,
    role: ['TEACHER'],
  },
  {
    path: `/${NavigationActionData[21].link}`,
    main: () => <MentorTakeAttendancePage />,
    role: ['TEACHER'],
  },
  {
    path: `/${NavigationActionData[22].link}`,
    main: () => <MentorReTakeAttendancePage />,
    role: ['TEACHER'],
  },
  {
    path: `/${NavigationActionData[23].link}`,
    main: () => <AdminApproveRegisterPage />,
    role: [],
  },
  {
    path: `/${NavigationActionData[24].link}`,
    main: () => <MentorRegisterRequestDetailsPage />,
    role: [],
  },
  {
    path: `/${NavigationActionData[25].link}`,
    main: () => <AdminProcessCourseCreateRequestPage />,
    role: [],
  },
  {
    path: `/${NavigationActionData[26].link}`,
    main: () => <MentorProcessCourseCreateRequestDetailsPage />,
    role: [],
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
  {
    path: '/test_page',
    main: () => <TestPage />,
    role: [],
  },
];

export const memberRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => <MemberDetailsPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `/${MemberNavigationActionData[0].link}`,
    main: () => <EditMemberProfilePage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `/${MemberNavigationActionData[1].link}`,
    main: () => <WalletManagementPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `/${MemberNavigationActionData[2].link}`,
    main: () => <WithdrawPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `/${MemberNavigationActionData[3].link}`,
    main: () => <MemberCourseListPage />,
    role: ['ROLE_STUDENT'],
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
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[0].link}`,
    main: () => <MentorEditProfilePage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[1].link}`,
    main: () => <WalletManagementPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[2].link}`,
    main: () => <WithdrawPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[3].link}`,
    main: () => <MentorCourseListPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[4].link}`,
    main: () => <MentorCreateCoursePage />,
    role: ['ROLE_TEACHER'],
  },
];
export const adminRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to="/admin/user" />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: '/homepage',
    main: () => <AdminPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: '/user',
    main: () => <AdminPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: '/course',
    main: () => <AdminPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
];

export default routes;
