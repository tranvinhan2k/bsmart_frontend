import { lazy } from 'react';

// profile
export const PolicyPage = lazy(() => import('~/pages/PolicyPage'));
export const HomePage = lazy(() => import('~/pages/HomePage'));
export const AboutUsPage = lazy(() => import('~/pages/AboutUsPage'));
export const LmsPage = lazy(() => import('~/pages/LmsPage'));
export const AnnotationPage = lazy(() => import('~/pages/AnnotationPage'));
export const BlogPage = lazy(() => import('~/pages/BlogPage'));
export const PaymentReport = lazy(() => import('~/pages/PaymentReport'));
export const BlogDetailsPage = lazy(() => import('~/pages/BlogDetailsPage'));
export const LoginGoogleSuccessPage = lazy(
  () => import('~/pages/LoginGoogleSuccessPage')
);

export const MemberEditPersonalInfoPage = lazy(
  () => import('~/pages/MemberEditProfilePage/MemberEditPersonalInfoPage')
);
export const MemberEditPasswordPage = lazy(
  () => import('~/pages/MemberEditProfilePage/MemberEditPasswordPage')
);
export const WalletManagementPage = lazy(
  () => import('~/pages/WalletManagementPage')
);
export const DashboardPage = lazy(() => import('~/pages/DashboardPage'));
export const QuizPage = lazy(() => import('~/pages/QuizPage'));
export const ReviewPage = lazy(() => import('~/pages/ReviewPage'));
export const WithdrawPage = lazy(() => import('~/pages/WithdrawPage'));
export const TestPage = lazy(() => import('~/pages/TestPage'));
export const RegisterPage = lazy(() => import('~/pages/RegisterPage'));
export const NotFoundPage = lazy(() => import('~/pages/NotFoundPage'));
export const LoginPage = lazy(() => import('~/pages/LoginPages'));
export const CoursesPage = lazy(() => import('~/pages/CoursesPage'));
export const CourseDetailPage = lazy(() => import('~/pages/CourseDetailPage'));
export const MentorDetailsPage = lazy(
  () => import('~/pages/MentorDetailsPage')
);
export const ForgotPasswordPage = lazy(
  () => import('~/pages/ForgotPasswordPage')
);
export const BuyCoursePage = lazy(() => import('~/pages/BuyCoursePage'));
export const AdminPage = lazy(() => import('~/pages/AdminPage'));
export const FeedbackPage = lazy(() => import('~/pages/FeedbackPage'));
export const MentorProfilePage = lazy(
  () => import('~/pages/MentorProfilePage')
);
export const MentorEditPersonalInfoPage = lazy(
  () => import('~/pages/MentorEditProfilePage/MentorEditPersonalInfoPage')
);
export const MentorEditPasswordPage = lazy(
  () => import('~/pages/MentorEditProfilePage/MentorEditPasswordPage')
);
export const MentorSendRequestPage = lazy(
  () => import('~/pages/MentorSendRequestPage')
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
export const ManageAnalyticPage = lazy(
  () => import('~/pages/ManageAnalyticPage')
);
export const ManageClassPage = lazy(() => import('~/pages/ManageClassPage'));
export const ManageCoursePage = lazy(() => import('~/pages/ManageCoursePage'));
export const ManageRequestManagerPage = lazy(
  () => import('~/pages/ManageRequestManagerPage')
);
export const ManageUserPage = lazy(() => import('~/pages/ManageUserPage'));

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

// mentor class
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
export const MentorTakeAttendancePage = lazy(
  () => import('~/pages/mentor_class/MentorTakeAttendancePage')
);
export const MentorClassStudentDetailPage = lazy(
  () => import('~/pages/mentor_class/MentorClassStudentDetailPage')
);
export const MentorClassFeedbacksPage = lazy(
  () => import('~/pages/mentor_class/MentorClassFeedbacksPage')
);
export const MentorClassModulesPage = lazy(
  () => import('~/pages/mentor_class/MentorClassModulesPage')
);
export const MentorClassMarkReportPage = lazy(
  () => import('~/pages/mentor_class/MentorClassMarkReportPage')
);

// member class
export const MemberClassDetailPage = lazy(
  () => import('~/pages/member_class/MemberClassDetailPage')
);
export const MemberClassListPage = lazy(
  () => import('~/pages/member_class/MemberClassListPage')
);
export const MemberClassContentPage = lazy(
  () => import('~/pages/member_class/MemberClassContentPage')
);
export const MemberClassInformationPage = lazy(
  () => import('~/pages/member_class/MemberClassInformationPage')
);
export const MemberClassSchedulePage = lazy(
  () => import('~/pages/member_class/MemberClassSchedulePage')
);
export const MemberAttendanceListPage = lazy(
  () => import('~/pages/member_class/MemberAttendanceListPage')
);
export const MemberClassMentorDetailPage = lazy(
  () => import('~/pages/member_class/MemberClassMentorDetailPage')
);
export const MemberClassModulesPage = lazy(
  () => import('~/pages/member_class/MemberClassModulesPage')
);
export const MemberPromoCode = lazy(
  () => import('~/pages/member_class/MemberPromoCode')
);
export const MemberClassMarkReportPage = lazy(
  () => import('~/pages/member_class/MemberClassMarkReportPage')
);

// admin

export const AdminManagerRevenuePage = lazy(
  () => import('~/pages/admin/AdminManagerRevenuePage')
);
export const AdminManagerQuestionBank = lazy(
  () => import('~/pages/admin/AdminManagerQuestionBank')
);

// question

export const ManagerQuestionsBankPage = lazy(
  () => import('~/pages/manager/ManagerQuestionsBankPage')
);
