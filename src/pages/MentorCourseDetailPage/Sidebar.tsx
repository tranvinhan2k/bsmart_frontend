import { Stack } from '@mui/material';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CourseContext } from '~/HOCs/context/CourseContext';
import DashboardNavigationTabs from '~/components/atoms/tabs/DashboardNavigationTabs';
import { MentorCourseActionLink } from '~/constants/routeLink';
import { MentorCourseNavigationActionData } from '~/routes/mentor/course/navigation';

export default function Sidebar() {
  const { pathname } = useLocation();
  const { classes, content, course } = useContext(CourseContext);

  const { status } = course;

  return (
    <Stack>
      {MentorCourseNavigationActionData.map((item, index) => {
        if (
          ((item.link === MentorCourseActionLink.tutorial ||
            item.link === MentorCourseActionLink.information) &&
            course) ||
          (item.link === MentorCourseActionLink.classes &&
            classes &&
            classes?.length > 0) ||
          (item.link === MentorCourseActionLink.content &&
            content &&
            content?.length > 0)
        ) {
          return (
            <DashboardNavigationTabs
              key={index}
              icon="squareCheckbox"
              isActive={pathname.includes(item.link)}
              link={item.link}
              name={item.name}
              isHide={
                item.courseStatus !== status && item.courseStatus !== 'ALL'
              }
            />
          );
        }
        return (
          <DashboardNavigationTabs
            key={index}
            icon={item.icon || 'course'}
            isActive={pathname.includes(item.link)}
            link={item.link}
            name={item.name}
            isHide={item.courseStatus !== status && item.courseStatus !== 'ALL'}
          />
        );
      })}
    </Stack>
  );
}
