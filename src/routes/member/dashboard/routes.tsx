import { Navigate } from 'react-router-dom';
import { MemberDashboardNavigationActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import BuildComponentPage from '~/pages/BuildComponentPage';
import MemberAttendanceListPage from '~/pages/member_class/MemberAttendanceListPage';
import {
  NotFoundPage,
  SchedulePage,
  MemberClassListPage,
  MemberClassDetailPage,
  QuizPage,
  ReviewPage,
  MemberPromoCode,
} from '~/routes/components';

export const studentLMSRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => (
      <Navigate to={MemberDashboardNavigationActionLink.class_list} replace />
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
    path: MemberDashboardNavigationActionLink.attendance,
    main: () => <MemberAttendanceListPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `${MemberDashboardNavigationActionLink.quiz}/:quizId`,
    main: () => <QuizPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: `${MemberDashboardNavigationActionLink.review}/:quizId`,
    main: () => <ReviewPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberDashboardNavigationActionLink.promo,
    main: () => <MemberPromoCode />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberDashboardNavigationActionLink.ask_ai,
    main: () => <BuildComponentPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
];
