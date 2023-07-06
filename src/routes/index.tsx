import Stack from '@mui/material/Stack';
import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

import {
  AdminNavigationActionLink,
  ManagerNavigationActionLink,
  MemberNavigationActionLink,
  MentorDashboardNavigationActionLink,
  MentorNavigationLink,
  NavigationLink,
} from '~/constants/routeLink';

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
const MenuDashboardPage = lazy(() => import('~/pages/MenuDashboardPage'));
const MentorClassListPage = lazy(() => import('~/pages/MentorClassListPage'));
const MemberEditPersonalInfoPage = lazy(
  () => import('~/pages/MemberEditProfilePage/MemberEditPersonalInfoPage')
);
const MemberEditImgInfoPage = lazy(
  () => import('~/pages/MemberEditProfilePage/MemberEditImgInfoPage')
);
const MemberEditPasswordPage = lazy(
  () => import('~/pages/MemberEditProfilePage/MemberEditPasswordPage')
);
const WalletManagementPage = lazy(() => import('~/pages/WalletManagementPage'));
const DashboardPage = lazy(() => import('~/pages/DashboardPage'));
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
const MentorEditPersonalInfoPage = lazy(
  () => import('~/pages/MentorEditProfilePage/MentorEditPersonalInfoPage')
);
const MentorEditProfileImgPage = lazy(
  () => import('~/pages/MentorEditProfilePage/MentorEditImgInfoPage')
);
const MentorEditPasswordPage = lazy(
  () => import('~/pages/MentorEditProfilePage/MentorEditPasswordPage')
);
const MentorEditMentorProfile = lazy(
  () => import('~/pages/MentorEditProfilePage/MentorEditMentorProfile')
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
const MentorUpdateAnnouncementPage = lazy(
  () => import('~/pages/MentorUpdateAnnouncementPage')
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
const MentorClassDetailPage = lazy(
  () => import('~/pages/MentorClassDetailPage')
);
const MentorQuizSettingsPage = lazy(
  () => import('~/pages/MentorQuizSettingsPage')
);
const MentorAssignmentSettingsPage = lazy(
  () => import('~/pages/MentorAssignmentSettingsPage')
);
const MentorAssignmentDetailsPage = lazy(
  () => import('~/pages/MentorAssignmentDetailsPage')
);
const MentorContractPage = lazy(() => import('~/pages/MentorContractPage'));
const MemberProfilePage = lazy(() => import('~/pages/MemberProfilePage'));
const ConfirmEmailPage = lazy(() => import('~/pages/ConfirmEmailPage'));

const FeedbackManagerPage = lazy(() => import('~/pages/FeedbackManagerPage'));
const SubjectManagerPage = lazy(() => import('~/pages/SubjectManagerPage'));
const CategoryManagerPage = lazy(() => import('~/pages/CategoryManagerPage'));
const MentorCourseDetailPage = lazy(
  () => import('~/pages/MentorCourseDetailPage')
);
const MentorAttendanceListPage = lazy(
  () => import('~/pages/MentorAttendanceListPage')
);

const routes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to={NavigationLink.homepage} />,
    role: [],
  },
  {
    path: NavigationLink.homepage,
    main: () => <HomePage />,
    role: [],
  },
  {
    path: NavigationLink.about_us,
    main: () => <AboutUsPage />,
    role: [],
  },
  {
    path: NavigationLink.course_menu,
    role: [],
    main: () => <CoursesPage />,
  },
  {
    path: `/${NavigationLink.mentor_profile}/*`,
    main: () => <MentorProfilePage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: NavigationLink.blog,
    main: () => <BlogPage />,
    role: [],
  },
  {
    path: NavigationLink.recruitment,
    main: () => <Stack>Recruitment</Stack>,
    role: [],
  },
  {
    path: NavigationLink.register,
    main: () => <RegisterPage />,
    role: ['GUEST'],
  },
  {
    path: NavigationLink.login,
    main: () => <LoginPage />,
    role: ['GUEST'],
  },
  {
    path: NavigationLink.course_menu_details,
    main: () => <CourseDetailPage />,
    role: ['GUEST', 'ROLE_STUDENT', 'ROLE_TEACHER'],
  },
  {
    path: NavigationLink.lms,
    main: () => <LmsPage />,
    role: [],
  },
  {
    path: NavigationLink.annotation,
    main: () => <AnnotationPage />,
    role: ['ROLE_STUDENT', 'ROLE_TEACHER'],
  },
  {
    path: NavigationLink.buy_course,
    main: () => <BuyCoursePage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: NavigationLink.blog_details,
    main: () => <BlogDetailsPage />,
    role: ['GUEST', 'ROLE_TEACHER', 'ROLE_STUDENT'],
  },
  {
    path: `/${NavigationLink.member_details}/*`,
    main: () => <MemberProfilePage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: NavigationLink.feedback,
    main: () => <FeedbackPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: NavigationLink.mentor_menu,
    main: () => <MentorsPage />,
    role: ['GUEST', 'ROLE_STUDENT', 'ROLE_TEACHER'],
  },
  {
    path: NavigationLink.cart,
    main: () => <CartPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: NavigationLink.contact,
    main: () => <MentorContractPage />,
    role: [],
  },
  {
    path: NavigationLink.check_out,
    main: () => <CheckoutPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: NavigationLink.confirm_email,
    main: () => <ConfirmEmailPage />,
    role: ['ROLE_STUDENT', 'ROLE_TEACHER', 'GUEST'],
  },
  {
    path: `/${NavigationLink.dashboard}/*`,
    main: () => <DashboardPage />,
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
    main: () => (
      <Navigate
        to={`/${NavigationLink.member_details}/${MemberNavigationActionLink.edit_profile_personal_info}`}
      />
    ),
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberNavigationActionLink.edit_profile_personal_info,
    main: () => <MemberEditPersonalInfoPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberNavigationActionLink.edit_profile_img,
    main: () => <MemberEditImgInfoPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberNavigationActionLink.edit_profile_password,
    main: () => <MemberEditPasswordPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberNavigationActionLink.wallet_management,
    main: () => <WalletManagementPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberNavigationActionLink.withdraw,
    main: () => <WithdrawPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberNavigationActionLink.member_course_list,
    main: () => <MemberCourseListPage />,
    role: ['ROLE_STUDENT'],
  },
];
export const mentorRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => (
      <Navigate
        to={`/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_personal_info}`}
      />
    ),
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorNavigationLink.edit_profile_personal_info,
    main: () => <MentorEditPersonalInfoPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorNavigationLink.edit_profile_mentor_info,
    main: () => <MentorEditMentorProfile />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorNavigationLink.edit_profile_img,
    main: () => <MentorEditProfileImgPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorNavigationLink.edit_profile_password,
    main: () => <MentorEditPasswordPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorNavigationLink.wallet_management,
    main: () => <WalletManagementPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorNavigationLink.withdraw,
    main: () => <WithdrawPage />,
    role: ['ROLE_TEACHER'],
  },
];
export const mentorLMSRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => (
      <Navigate
        to={`/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_menu_dashboard}`}
      />
    ),
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_menu_dashboard,
    main: () => <MenuDashboardPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_course_list,
    main: () => <MentorCourseListPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `${MentorDashboardNavigationActionLink.mentor_course_list}/:id`,
    main: () => <MentorCourseDetailPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.create_course,
    main: () => <MentorCreateCoursePage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_class_list,
    main: () => <MentorClassListPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_class_detail_1,
    main: () => <MentorClassDetailPage />,
    role: ['ROLE_TEACHER'],
  },
  // TODO: Đã có route cho trang này
  // {
  //   path: MentorDashboardNavigationActionLink.mentor_class_detail_2,
  //   main: () => <MentorCourseDetailPage />,
  //   role: ['ROLE_TEACHER'],
  // },
  // {
  //   path: MentorDashboardNavigationActionLink.create_content,
  //   main: () => <CreateContentPage />,
  //   role: ['ROLE_STUDENT', 'ROLE_TEACHER'],
  // },
  {
    path: MentorDashboardNavigationActionLink.mentor_quiz_settings,
    main: () => <MentorQuizSettingsPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_create_quiz,
    main: () => <MentorCreateQuizPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_assignment_settings_1,
    main: () => <MentorCreateAssignmentPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_create_assignment,
    main: () => <MentorCreateAssignmentPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_assignment_settings_2,
    main: () => <MentorAssignmentSettingsPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_assignment_details,
    main: () => <MentorAssignmentDetailsPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_create_announcement,
    main: () => <MentorCreateAnnouncementPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_create_announcement,
    main: () => <MentorCreateAnnouncementPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_update_announcement,
    main: () => <MentorUpdateAnnouncementPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.take_attendance_1,
    main: () => <MentorAttendanceListPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.view_member_attendance,
    main: () => <MentorViewStudentAttendancePage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.take_attendance_2,
    main: () => <MentorTakeAttendancePage />,
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
    path: AdminNavigationActionLink.feedback_manager,
    main: () => <FeedbackManagerPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.category_manager,
    main: () => <CategoryManagerPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.subject_manager,
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
    path: ManagerNavigationActionLink.account_search,
    main: () => <h1>Manager xem tất cả người dùng</h1>,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.process_register_request_search,
    main: () => <ManagerProcessRegisterRequestPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.process_register_request_details,
    main: () => <ManagerProcessRegisterRequestDetailsPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.course_search,
    main: () => <h1>Manager xem tất khóa học</h1>,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.process_create_course_request_search,
    main: () => <ManagerProcessCourseCreateRequestPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.process_create_course_request_details,
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
