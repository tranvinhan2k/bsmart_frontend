import { Navigate } from 'react-router-dom';
import { MemberClassActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';

export const memberClassRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to={MemberClassActionLink.information} />,
    role: ['ROLE_TEACHER'],
    courseStatus: 'ALL',
  },
  {
    path: MemberClassActionLink.information,
    main: () => <div>Information Class</div>,
    role: ['ROLE_TEACHER'],
    courseStatus: 'ALL',
  },
];
