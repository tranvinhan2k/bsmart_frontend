import { Navigate } from 'react-router-dom';
import { ManagerNavigationActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import {
  ManagerProcessCourseCreateRequestDetailsPage,
  ManagerProcessCourseCreateRequestPage,
  ManagerProcessRegisterRequestDetailsPage,
  ManagerProcessRegisterRequestPage,
  NotFoundPage,
} from '~/routes/components';

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
