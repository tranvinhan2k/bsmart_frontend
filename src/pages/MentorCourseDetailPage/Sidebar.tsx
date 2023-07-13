import { Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DashboardNavigationTabs from '~/components/atoms/tabs/DashboardNavigationTabs';
import { CourseStatusKeys } from '~/models/variables';
import { MentorCourseNavigationActionData } from '~/routes/mentor/course/navigation';

interface Props {
  status: CourseStatusKeys;
}

export default function Sidebar({ status }: Props) {
  const { pathname } = useLocation();

  return (
    <Stack>
      {MentorCourseNavigationActionData.map((item, index) => {
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
