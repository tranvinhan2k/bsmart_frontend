import { Stack } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import DashboardNavigationTabs from '~/components/atoms/tabs/DashboardNavigationTabs';
import { MentorCourseActionLink } from '~/constants/routeLink';
import {
  useQueryGetCourseContent,
  useQueryGetMentorCourseClasses,
} from '~/hooks';
import useQueryMentorCourse from '~/hooks/course/useQueryMentorCourse';
import { CourseStatusKeys } from '~/models/variables';
import { MentorCourseNavigationActionData } from '~/routes/mentor/course/navigation';
import { formatStringToNumber } from '~/utils/number';

interface Props {
  status: CourseStatusKeys;
}

export default function Sidebar({ status }: Props) {
  const { id } = useParams();
  const courseId = formatStringToNumber(id);
  const { pathname } = useLocation();
  const { course } = useQueryMentorCourse(courseId);
  const { classes } = useQueryGetMentorCourseClasses(courseId);
  const { data } = useQueryGetCourseContent(courseId);
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
          (item.link === MentorCourseActionLink.classes &&
            data &&
            data?.length > 0)
        ) {
          return (
            <DashboardNavigationTabs
              key={index}
              icon="squareCheckbox"
              isActive={pathname.includes(item.link)}
              link={item.link}
              name={item.name}
              isHide={item.classStatus !== status && item.classStatus !== 'ALL'}
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
            isHide={item.classStatus !== status && item.classStatus !== 'ALL'}
          />
        );
      })}
    </Stack>
  );
}
