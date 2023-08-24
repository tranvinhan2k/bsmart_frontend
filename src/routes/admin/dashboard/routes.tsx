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
  AdminManageWithdrawRequest,
  AdminManageAnalyticPage,
  ConfirmEmailPage,
} from '~/routes/components';

export const adminRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to={AdminNavigationActionLink.analytic} />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.user_manager,
    main: () => <ManageUserPage />,
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
    path: AdminNavigationActionLink.revenue,
    main: () => <AdminManagerRevenuePage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.withdraw_request,
    main: () => <AdminManageWithdrawRequest />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.analytic,
    main: () => <AdminManageAnalyticPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.confirm_email,
    main: () => <ConfirmEmailPage />,
    role: [],
  },
  {
    path: '*',
    main: () => (
      <Navigate to={AdminNavigationActionLink.user_manager} replace />
    ),
    role: [],
  },
];
