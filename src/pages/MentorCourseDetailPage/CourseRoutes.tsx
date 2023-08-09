import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CourseContext } from '~/HOCs/context/CourseContext';
import {
  NavigationLink,
  MentorDashboardNavigationActionLink,
  MentorCourseActionLink,
} from '~/constants/routeLink';
import { useGetIdFromUrl } from '~/hooks';
import { mentorCourseRoutes } from '~/routes/mentor/course/routes';

export default function CourseRoutes() {
  const id = useGetIdFromUrl('id');
  const { course } = useContext(CourseContext);

  const showRoutes = () => {
    return mentorCourseRoutes.map((route, index) => {
      if (
        course.status !== route.courseStatus &&
        route.courseStatus !== 'ALL'
      ) {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Navigate
                to={`/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${id}/${MentorCourseActionLink.information}`}
                replace
              />
            }
          />
        );
      }
      if (index === 0) {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Navigate
                to={
                  // eslint-disable-next-line no-nested-ternary
                  course.status === 'EDITREQUEST'
                    ? MentorCourseActionLink.edit_request
                    : course.status === 'REQUESTING'
                    ? MentorCourseActionLink.tutorial
                    : MentorCourseActionLink.information
                }
              />
            }
          />
        );
      }
      return (
        <Route key={route.path} path={route.path} element={route.main()} />
      );
    });
  };

  return <Routes>{showRoutes()}</Routes>;
}
