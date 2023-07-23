import { Navigate } from 'react-router-dom';
import { MentorClassActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import MentorClassAttendanceListPage from '~/pages/mentor_class/MentorClassAttendanceListPage';
import {
  MentorClassContentPage,
  MentorClassFeedbacksPage,
  MentorClassInformationPage,
  MentorClassNotificationPage,
  MentorClassPointsPage,
  MentorClassSchedulePage,
  MentorClassStudentDetailPage,
  MentorClassStudentListPage,
  MentorTakeAttendancePage,
} from '~/routes/components';

export const mentorClassRoutes = (courseId?: number): RoutePayload[] => {
  return [
    {
      path: '/',
      main: () => <Navigate to={MentorClassActionLink.schedule} />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: MentorClassActionLink.information,
      main: () => <MentorClassInformationPage />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: MentorClassActionLink.activity,
      main: () => <MentorClassContentPage courseId={courseId || 0} />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: MentorClassActionLink.attendance,
      main: () => <MentorClassAttendanceListPage />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: `${MentorClassActionLink.take_attendance}/:timetableId`,
      main: () => <MentorTakeAttendancePage />,
      role: ['ROLE_TEACHER'],
    },
    {
      path: MentorClassActionLink.notification,
      main: () => <MentorClassNotificationPage />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: MentorClassActionLink.schedule,
      main: () => <MentorClassSchedulePage />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: MentorClassActionLink.students,
      main: () => <MentorClassStudentListPage />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: MentorClassActionLink.points,
      main: () => <MentorClassPointsPage />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: `${MentorClassActionLink.student_detail}/:studentId`,
      main: () => <MentorClassStudentDetailPage />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: MentorClassActionLink.feedback,
      main: () => <MentorClassFeedbacksPage />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
  ];
};
