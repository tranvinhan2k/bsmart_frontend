import { Navigate } from 'react-router-dom';
import { ManagerNavigationActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import {
  CategoryManagerPage,
  ManageClassPage,
  ManageCoursePage,
  ManageRequestManagerPage,
  ManageUserPage,
  SubjectManagerPage,
} from '~/routes/components';

export const managerRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to={ManagerNavigationActionLink.manager_request} />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manager_request,
    main: () => <ManageRequestManagerPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manager_user,
    main: () => <ManageUserPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manager_course,
    main: () => <ManageCoursePage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manager_class,
    main: () => <ManageClassPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manager_category,
    main: () => <CategoryManagerPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manager_subject,
    main: () => <SubjectManagerPage />,
    role: ['ROLE_MANAGER'],
  },
  // {
  //   path: ManagerNavigationActionLink.confirm_email,
  //   main: () => <ConfirmEmailPage />,
  //   role: [],
  // },
  {
    path: '*',
    main: () => (
      <Navigate to={ManagerNavigationActionLink.manager_request} replace />
    ),
    role: [],
  },
];
