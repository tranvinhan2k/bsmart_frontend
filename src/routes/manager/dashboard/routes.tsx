import { Navigate } from 'react-router-dom';
import { ManagerNavigationActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import ClassFeedbackDetailPage from '~/pages/ClassFeedbackDetailPage';
import {
  ManageClassPage,
  ManageCourseCreateRequestPage,
  ManageCoursePage,
  ManageMentorProfileUpdateRequestPage,
  ManageRegisterRequestPage,
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
    path: ManagerNavigationActionLink.manage_class_manager,
    main: () => <ManageClassPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manage_course_create_request_manager,
    main: () => <ManageCourseCreateRequestPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manage_course_manager,
    main: () => <ManageCoursePage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manage_mentor_profile_update_request,
    main: () => <ManageMentorProfileUpdateRequestPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manage_register_request_manager,
    main: () => <ManageRegisterRequestPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: ManagerNavigationActionLink.manage_user_manager,
    main: () => <ManageUserPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: 'temp_feedback_class_detail',
    main: () => <ClassFeedbackDetailPage />,
    role: ['ROLE_MANAGER'],
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
];
