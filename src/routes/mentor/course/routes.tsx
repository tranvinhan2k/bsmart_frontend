import { Navigate } from 'react-router-dom';
import { MentorCourseActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import MentorCourseAddModulePage from '~/pages/MentorCourseAddModulePage';
import MentorCourseModulesPage from '~/pages/MentorCourseModulesPage';
import MentorCourseSectionsPage from '~/pages/MentorCourseSectionsPage';
import {
  MentorCourseClassesPage,
  MentorCourseContentPage,
  MentorCourseInformationPage,
  MentorCourseRequiedEditPage,
  MentorCourseTutorialPage,
} from '~/routes/components';

export const mentorCourseRoutes = (refetch: any): RoutePayload[] => {
  return [
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
      main: () => <MentorCourseClassesPage refetchGetPercent={refetch} />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: `${MentorCourseActionLink.content}`,
      main: () => <MentorCourseContentPage refetchGetPercent={refetch} />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: `${MentorCourseActionLink.content}/:sectionId/`,
      main: () => <MentorCourseSectionsPage />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: `${MentorCourseActionLink.content}/:sectionId/:moduleId`,
      main: () => <MentorCourseModulesPage />,
      role: ['ROLE_TEACHER'],
      courseStatus: 'ALL',
    },
    {
      path: `${MentorCourseActionLink.content}/:sectionId/add/:type`,
      main: () => <MentorCourseAddModulePage />,
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
};
