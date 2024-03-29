import { Navigate } from 'react-router-dom';
import { MentorDashboardNavigationActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import ReviewPage from '~/pages/ReviewPage';
import {
  MentorCourseListPage,
  MentorCourseDetailPage,
  MentorCreateCoursePage,
  MentorClassListPage,
  MentorClassDetailPage,
  MentorQuizSettingsPage,
  MentorCreateQuizPage,
  MentorCreateAssignmentPage,
  MentorAssignmentSettingsPage,
  MentorAssignmentDetailsPage,
  MentorCreateAnnouncementPage,
  MentorUpdateAnnouncementPage,
  MentorClassAttendanceListPage,
  MentorViewStudentAttendancePage,
  NotFoundPage,
  SchedulePage,
} from '~/routes/components';

export const mentorLMSRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => (
      <Navigate
        to={MentorDashboardNavigationActionLink.mentor_course_list}
        replace
      />
    ),
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.mentor_course_list,
    main: () => <MentorCourseListPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: `${MentorDashboardNavigationActionLink.mentor_course_detail}/:id/*`,
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
    path: `${MentorDashboardNavigationActionLink.mentor_class_detail}/:id/*`,
    main: () => <MentorClassDetailPage />,
    role: ['ROLE_TEACHER'],
  },
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
    path: `${MentorDashboardNavigationActionLink.review}/:quizId`,
    main: () => <ReviewPage />,
    role: ['ROLE_STUDENT'],
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
    path: MentorDashboardNavigationActionLink.attendance_list,
    main: () => <MentorClassAttendanceListPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.view_member_attendance,
    main: () => <MentorViewStudentAttendancePage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorDashboardNavigationActionLink.schedule,
    main: () => <SchedulePage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
];
