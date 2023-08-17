import { Navigate } from 'react-router-dom';
import {
  ManagerNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import ClassFeedbackDetailPage from '~/pages/ClassFeedbackDetailPage';
import {
  ConfirmEmailPage,
  ManageAnalyticPage,
  ManageClassPage,
  ManageCoursePage,
  ManageRequestManagerPage,
  ManageUserPage,
  ManagerQuestionsBankPage,
  ManageFinancialPage,
  NotFoundPage,
} from '~/routes/components';

export const managerRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => (
      <Navigate to={ManagerNavigationActionLink.manage_analytic_manager} />
    ),
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
    path: ManagerNavigationActionLink.manage_financial_manager,
    main: () => <ManageFinancialPage />,
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
    path: ManagerNavigationActionLink.questions_bank,
    main: () => <ManagerQuestionsBankPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.confirm_email,
    main: () => <ConfirmEmailPage />,
    role: [],
  },
  {
    path: '*',
    main: () => (
      <Navigate
        to={ManagerNavigationActionLink.manage_analytic_manager}
        replace
      />
    ),
    role: [],
  },
];
