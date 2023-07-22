import { Navigate } from 'react-router-dom';
import { MemberClassActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import {
  MemberAttendanceListPage,
  MemberClassContentPage,
  MemberClassInformationPage,
  MemberClassMentorDetailPage,
  MemberClassSchedulePage,
} from '~/routes/components';

export const memberClassRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to={MemberClassActionLink.information} />,
    role: ['ROLE_STUDENT'],
    courseStatus: 'ALL',
  },
  {
    path: MemberClassActionLink.information,
    main: () => <MemberClassInformationPage />,
    role: ['ROLE_STUDENT'],
    courseStatus: 'ALL',
  },
  {
    path: MemberClassActionLink.activity,
    main: () => <MemberClassContentPage />,
    role: ['ROLE_STUDENT'],
    courseStatus: 'ALL',
  },
  {
    path: MemberClassActionLink.schedule,
    main: () => <MemberClassSchedulePage />,
    role: ['ROLE_STUDENT'],
    courseStatus: 'ALL',
  },
  {
    path: MemberClassActionLink.attendance,
    main: () => <MemberAttendanceListPage />,
    role: ['ROLE_STUDENT'],
    courseStatus: 'ALL',
  },
  {
    path: MemberClassActionLink.mentor,
    main: () => <MemberClassMentorDetailPage />,
    role: ['ROLE_STUDENT'],
    courseStatus: 'ALL',
  },
];
