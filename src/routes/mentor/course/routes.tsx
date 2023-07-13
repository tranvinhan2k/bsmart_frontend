import { Navigate } from 'react-router-dom';
import {
  NavigationLink,
  MentorDashboardNavigationActionLink,
  MentorCourseActionLink,
} from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import {
  MentorCourseClassesPage,
  MentorCourseContentPage,
  MentorCourseInformationPage,
  MentorCourseRequiedEditPage,
  MentorCourseTutorialPage,
} from '~/routes/components';

export const mentorCourseRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to={MentorCourseActionLink.information} />,
    role: ['ROLE_TEACHER'],
    courseStatus: 'ALL',
  },
  {
    path: MentorCourseActionLink.information,
    main: () => <MentorCourseInformationPage />,
    role: ['ROLE_TEACHER'],
    courseStatus: 'ALL',
  },
  {
    path: MentorCourseActionLink.classes,
    main: () => <MentorCourseClassesPage />,
    role: ['ROLE_TEACHER'],
    courseStatus: 'ALL',
  },
  {
    path: MentorCourseActionLink.content,
    main: () => <MentorCourseContentPage />,
    role: ['ROLE_TEACHER'],
    courseStatus: 'ALL',
  },
  {
    path: MentorCourseActionLink.tutorial,
    main: () => <MentorCourseTutorialPage />,
    role: ['ROLE_TEACHER'],
    courseStatus: 'REQUESTING',
  },
  {
    path: MentorCourseActionLink.edit_request,
    main: () => <MentorCourseRequiedEditPage />,
    role: ['ROLE_TEACHER'],
    courseStatus: 'EDITREQUEST',
  },
];
