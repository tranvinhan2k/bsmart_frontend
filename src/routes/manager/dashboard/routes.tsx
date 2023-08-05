import { Navigate } from 'react-router-dom';
import { ManagerNavigationActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import ClassFeedbackDetailPage from '~/pages/ClassFeedbackDetailPage';
import {
  ManageAnalyticPage,
  ManageClassPage,
  ManageCoursePage,
  ManageRequestManagerPage,
  ManageUserPage,
  NotFoundPage,
} from '~/routes/components';

export const managerRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to="/manager/user" />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manage_analytic_manager,
    main: () => <ManageAnalyticPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manage_class_manager,
    main: () => <ManageClassPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manage_course_manager,
    main: () => <ManageCoursePage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manage_request_manager,
    main: () => <ManageRequestManagerPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manage_user_manager,
    main: () => <ManageUserPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: 'temp_feedback_class_detail',
    main: () => <ClassFeedbackDetailPage isAdmin />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
];
