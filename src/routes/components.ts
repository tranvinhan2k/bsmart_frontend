import { lazy } from 'react';

// profile
export const HomePage = lazy(() => import('~/pages/HomePage'));
export const AboutUsPage = lazy(() => import('~/pages/AboutUsPage'));
export const LmsPage = lazy(() => import('~/pages/LmsPage'));
export const AnnotationPage = lazy(() => import('~/pages/AnnotationPage'));
export const BlogPage = lazy(() => import('~/pages/BlogPage'));
export const BlogDetailsPage = lazy(() => import('~/pages/BlogDetailsPage'));
export const MemberClassListPage = lazy(
  () => import('~/pages/MemberClassListPage')
);
export const MemberAttendanceListPage = lazy(
  () => import('~/pages/MemberAttendanceListPage')
);
export const MemberEditPersonalInfoPage = lazy(
  () => import('~/pages/MemberEditProfilePage/MemberEditPersonalInfoPage')
);
export const MemberEditImgInfoPage = lazy(
  () => import('~/pages/MemberEditProfilePage/MemberEditImgInfoPage')
);
export const MemberEditPasswordPage = lazy(
  () => import('~/pages/MemberEditProfilePage/MemberEditPasswordPage')
);
export const WalletManagementPage = lazy(
  () => import('~/pages/WalletManagementPage')
);
export const DashboardPage = lazy(() => import('~/pages/DashboardPage'));
export const WithdrawPage = lazy(() => import('~/pages/WithdrawPage'));
export const TestPage = lazy(() => import('~/pages/TestPage'));
export const RegisterPage = lazy(() => import('~/pages/RegisterPage'));
export const NotFoundPage = lazy(() => import('~/pages/NotFoundPage'));
export const LoginPage = lazy(() => import('~/pages/LoginPages'));
export const CoursesPage = lazy(() => import('~/pages/CoursesPage'));
export const CourseDetailPage = lazy(() => import('~/pages/CourseDetailPage'));
export const BuyCoursePage = lazy(() => import('~/pages/BuyCoursePage'));
export const AdminPage = lazy(() => import('~/pages/AdminPage'));
export const FeedbackPage = lazy(() => import('~/pages/FeedbackPage'));
export const MentorProfilePage = lazy(
  () => import('~/pages/MentorProfilePage')
);
export const MentorEditPersonalInfoPage = lazy(
  () => import('~/pages/MentorEditProfilePage/MentorEditPersonalInfoPage')
);
export const MentorEditProfileImgPage = lazy(
  () => import('~/pages/MentorEditProfilePage/MentorEditImgInfoPage')
);
export const MentorEditPasswordPage = lazy(
  () => import('~/pages/MentorEditProfilePage/MentorEditPasswordPage')
);
export const MentorEditMentorProfile = lazy(
  () => import('~/pages/MentorEditProfilePage/MentorEditMentorProfile')
);
export const MentorsPage = lazy(() => import('~/pages/MentorsPage'));
export const MentorCourseListPage = lazy(
  () => import('~/pages/MentorCourseListPage')
);
export const MentorCreateCoursePage = lazy(
  () => import('~/pages/MentorCreateCoursePage')
);
export const MentorTakeAttendancePage = lazy(
  () => import('~/pages/MentorTakeAttendancePage')
);
export const MentorViewStudentAttendancePage = lazy(
  () => import('~/pages/MentorViewStudentAttendancePage')
);
export const MentorCreateQuizPage = lazy(
  () => import('~/pages/MentorCreateQuizPage')
);
export const MentorCreateAssignmentPage = lazy(
  () => import('~/pages/MentorCreateAssignmentPage')
);
export const MentorCreateAnnouncementPage = lazy(
  () => import('~/pages/MentorCreateAnnouncementPage')
);
export const MentorUpdateAnnouncementPage = lazy(
  () => import('~/pages/MentorUpdateAnnouncementPage')
);
export const ManagerProcessRegisterRequestPage = lazy(
  () => import('~/pages/ManagerProcessRegisterRequestPage')
);
export const ManagerProcessRegisterRequestDetailsPage = lazy(
  () => import('~/pages/ManagerProcessRegisterRequestDetailsPage')
);
export const ManagerProcessCourseCreateRequestPage = lazy(
  () => import('~/pages/ManagerProcessCourseCreateRequestPage')
);
export const ManagerProcessCourseCreateRequestDetailsPage = lazy(
  () => import('~/pages/ManagerProcessCourseCreateRequestDetailsPage')
);

export const MentorQuizSettingsPage = lazy(
  () => import('~/pages/MentorQuizSettingsPage')
);
export const MentorAssignmentSettingsPage = lazy(
  () => import('~/pages/MentorAssignmentSettingsPage')
);
export const MentorAssignmentDetailsPage = lazy(
  () => import('~/pages/MentorAssignmentDetailsPage')
);
export const MentorContractPage = lazy(
  () => import('~/pages/MentorContractPage')
);
export const MemberProfilePage = lazy(
  () => import('~/pages/MemberProfilePage')
);
export const ConfirmEmailPage = lazy(() => import('~/pages/ConfirmEmailPage'));
export const UserManagerPage = lazy(() => import('~/pages/UserManagerPage'));
export const FeedbackManagerPage = lazy(
  () => import('~/pages/FeedbackManagerPage')
);
export const SubjectManagerPage = lazy(
  () => import('~/pages/SubjectManagerPage')
);
export const CategoryManagerPage = lazy(
  () => import('~/pages/CategoryManagerPage')
);
export const MentorCourseDetailPage = lazy(
  () => import('~/pages/MentorCourseDetailPage')
);
export const SchedulePage = lazy(() => import('~/pages/SchedulePage'));

// course
export const MentorCourseRequiedEditPage = lazy(
  () => import('~/pages/mentor_course/MentorCourseRequiedEditPage')
);
export const MentorCourseInformationPage = lazy(
  () => import('~/pages/mentor_course/MentorCourseInformationPage')
);
export const MentorCourseTutorialPage = lazy(
  () => import('~/pages/mentor_course/MentorCourseTutorialPage')
);
export const MentorCourseContentPage = lazy(
  () => import('~/pages/mentor_course/MentorCourseContentPage')
);
export const MentorCourseClassesPage = lazy(
  () => import('~/pages/mentor_course/MentorCourseClassesPage')
);

// class
export const MentorClassInformationPage = lazy(
  () => import('~/pages/mentor_class/MentorClassInformationPage')
);
export const MentorClassContentPage = lazy(
  () => import('~/pages/mentor_class/MentorClassContentPage')
);
export const MentorClassDetailPage = lazy(
  () => import('~/pages/mentor_class/MentorClassDetailPage')
);
export const MentorClassNotificationPage = lazy(
  () => import('~/pages/mentor_class/MentorClassNotificationPage')
);
export const MentorClassSchedulePage = lazy(
  () => import('~/pages/mentor_class/MentorClassSchedulePage')
);
export const MentorClassListPage = lazy(
  () => import('~/pages/mentor_class/MentorClassListPage')
);
export const MentorClassStudentListPage = lazy(
  () => import('~/pages/mentor_class/MentorClassStudentListPage')
);
export const MentorClassAttendanceListPage = lazy(
  () => import('~/pages/mentor_class/MentorClassAttendanceListPage')
);
