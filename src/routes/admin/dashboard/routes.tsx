import { Navigate } from 'react-router-dom';
import { AdminNavigationActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import {
  AdminPage,
  ManageUserPage,
  CategoryManagerPage,
  FeedbackManagerPage,
  NotFoundPage,
  SubjectManagerPage,
  AdminManagerQuestionBank,
  AdminManagerRevenuePage,
} from '~/routes/components';

export const adminRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to="/admin/user" />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: '/homepage',
    main: () => <AdminPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: '/user',
    main: () => <AdminPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: '/course',
    main: () => <AdminPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.user_manager,
    main: () => <ManageUserPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.feedback_manager,
    main: () => <FeedbackManagerPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.category_manager,
    main: () => <CategoryManagerPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.subject_manager,
    main: () => <SubjectManagerPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.questions_bank,
    main: () => <AdminManagerQuestionBank />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.revenue,
    main: () => <AdminManagerRevenuePage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
];
