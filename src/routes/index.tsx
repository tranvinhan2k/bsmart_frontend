import Stack from '@mui/material/Stack';
import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

import {
  AdminNavigationActionData,
  ManagerNavigationActionData,
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
const MentorViewStudentAttendancePage = lazy(
  () => import('~/pages/MentorViewStudentAttendancePage')
);
const MentorCreateQuizPage = lazy(() => import('~/pages/MentorCreateQuizPage'));
const MentorCreateAssignmentPage = lazy(
  () => import('~/pages/MentorCreateAssignmentPage')
);
const MentorCreateAnnouncementPage = lazy(
  () => import('~/pages/MentorCreateAnnouncementPage')
);
const ManagerProcessRegisterRequestPage = lazy(
  () => import('~/pages/ManagerProcessRegisterRequestPage')
);
const ManagerProcessRegisterRequestDetailsPage = lazy(
  () => import('~/pages/ManagerProcessRegisterRequestDetailsPage')
);
const ManagerProcessCourseCreateRequestPage = lazy(
  () => import('~/pages/ManagerProcessCourseCreateRequestPage')
);
const ManagerProcessCourseCreateRequestDetailsPage = lazy(
  () => import('~/pages/ManagerProcessCourseCreateRequestDetailsPage')
);
const MentorResourceManagePage = lazy(
  () => import('~/pages/MentorResourceManagePage')
);
const MentorQuizSettingsPage = lazy(
  () => import('~/pages/MentorQuizSettingsPage')
);
const MentorContractPage = lazy(() => import('~/pages/MentorContractPage'));
const MemberProfilePage = lazy(() => import('~/pages/MemberProfilePage'));
const ConfirmEmailPage = lazy(() => import('~/pages/ConfirmEmailPage'));

const FeedbackManagerPage = lazy(() => import('~/pages/FeedbackManagerPage'));
const SubjectManagerPage = lazy(() => import('~/pages/SubjectManagerPage'));
const CategoryManagerPage = lazy(() => import('~/pages/CategoryManagerPage'));
const CreateContentPage = lazy(() => import('~/pages/CreateContentPage'));
const MentorCourseDetailPage = lazy(
  () => import('~/pages/MentorCourseDetailPage')
);
const MentorAttendanceListPage = lazy(
  () => import('~/pages/MentorAttendanceListPage')
);

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
  {
    path: `/${MentorNavigationActionData[5].link}`,
    main: () => {
      return <div>mentor-introduce</div>;
    },
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[6].link}`,
    main: () => <MentorResourceManagePage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[7].link}`,
    main: () => <MentorQuizSettingsPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[8].link}`,
    main: () => <MentorAttendanceListPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[9].link}`,
    main: () => <MentorViewStudentAttendancePage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[10].link}`,
    main: () => <MentorCreateQuizPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[11].link}`,
    main: () => <MentorCourseDetailPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[12].link}`,
    main: () => <MentorCreateAssignmentPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[13].link}`,
    main: () => <MentorCreateAnnouncementPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[14].link}`,
    main: () => <MentorTakeAttendancePage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[15].link}`,
    main: () => <CreateContentPage />,
    role: ['ROLE_STUDENT', 'ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[16].link}`,
    main: () => <MentorCreateAssignmentPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `/${MentorNavigationActionData[17].link}`,
    main: () => <MentorCreateAnnouncementPage />,
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
    path: `/${AdminNavigationActionData[2].link}`,
    main: () => <FeedbackManagerPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: `/${AdminNavigationActionData[3].link}`,
    main: () => <CategoryManagerPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: `/${AdminNavigationActionData[4].link}`,
    main: () => <SubjectManagerPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
];

export const managerRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to="/manager/user" />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: `/${ManagerNavigationActionData[1].link}`,
    main: () => <h1>Manager xem tất cả giáo viên</h1>,
    role: ['ROLE_MANAGER'],
  },
  {
    path: `/${ManagerNavigationActionData[2].link}`,
    main: () => <ManagerProcessRegisterRequestPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: `/${ManagerNavigationActionData[3].link}`,
    main: () => <ManagerProcessRegisterRequestDetailsPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: `/${ManagerNavigationActionData[4].link}`,
    main: () => <h1>Manager xem tất khóa học</h1>,
    role: ['ROLE_MANAGER'],
  },
  {
    path: `/${ManagerNavigationActionData[5].link}`,
    main: () => <ManagerProcessCourseCreateRequestPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: `/${ManagerNavigationActionData[6].link}`,
    main: () => <ManagerProcessCourseCreateRequestDetailsPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
];

export default routes;
