import { Navigate } from 'react-router-dom';
import {
  MemberDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import {
  MentorCourseDetailPage,
  MentorClassListPage,
  NotFoundPage,
  SchedulePage,
  MentorClassDetailPage,
  MemberClassListPage,
  MemberClassDetailPage,
} from '~/routes/components';

export const studentLMSRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => (
      <Navigate
        to={`/${NavigationLink.dashboard}/${MemberDashboardNavigationActionLink.class_list}`}
      />
    ),
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberDashboardNavigationActionLink.class_list,
    main: () => <MemberClassListPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `${MemberDashboardNavigationActionLink.class_detail}/:id/*`,
    main: () => <MemberClassDetailPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberDashboardNavigationActionLink.schedule,
    main: () => <SchedulePage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
];
