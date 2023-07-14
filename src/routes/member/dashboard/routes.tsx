import { Navigate } from 'react-router-dom';
import {
  NavigationLink,
  StudentDashboardNavigationActionLink,
} from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import MemberAttendanceListPage from '~/pages/MemberAttendanceListPage';
import {
  MentorCourseDetailPage,
  MemberClassListPage,
  NotFoundPage,
  SchedulePage,
  MentorClassDetailPage,
} from '~/routes/components';

export const studentLMSRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => (
      <Navigate
        to={`/${NavigationLink.dashboard}/${StudentDashboardNavigationActionLink.class_list}`}
      />
    ),
    role: ['ROLE_STUDENT'],
  },
  {
    path: StudentDashboardNavigationActionLink.class_list,
    main: () => <MemberClassListPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `${StudentDashboardNavigationActionLink.class_detail}/:id/*`,
    main: () => <MentorClassDetailPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: StudentDashboardNavigationActionLink.schedule,
    main: () => <SchedulePage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: StudentDashboardNavigationActionLink.attendance,
    main: () => <MemberAttendanceListPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
];
