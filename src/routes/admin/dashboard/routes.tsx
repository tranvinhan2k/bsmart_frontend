import { Navigate } from 'react-router-dom';
import { AdminNavigationActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import {
  AdminManageAnalyticPage,
  AdminManageWithdrawRequest,
  AdminConfigReferralCodePage,
  FeedbackManagerPage,
} from '~/routes/components';

export const adminRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to={AdminNavigationActionLink.admin_analytic} />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.admin_analytic,
    main: () => <AdminManageAnalyticPage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.admin_withdraw_request,
    main: () => <AdminManageWithdrawRequest />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.admin_referral_code,
    main: () => <AdminConfigReferralCodePage />,
    role: ['ROLE_ADMIN'],
  },
  {
    path: AdminNavigationActionLink.admin_feedback,
    main: () => <FeedbackManagerPage />,
    role: ['ROLE_ADMIN'],
  },
  // {
  //   path: AdminNavigationActionLink.revenue,
  //   main: () => <AdminManagerRevenuePage />,
  //   role: ['ROLE_ADMIN'],
  // },
  // {
  //   path: AdminNavigationActionLink.confirm_email,
  //   main: () => <ConfirmEmailPage />,
  //   role: [],
  // },
  {
    path: '*',
    main: () => (
      <Navigate to={AdminNavigationActionLink.admin_analytic} replace />
    ),
    role: [],
  },
];
