import { Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { Color, MetricSize } from '~/assets/variables';
import UserCourseItem from '../UserCourseItem';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';

interface MentorCourseItemProps {
  item?: any;
  isSkeleton?: boolean;
}

export default function MentorCourseItem({
  item,
  isSkeleton = false,
}: MentorCourseItemProps) {
  const navigate = useNavigate();

  const handleNavigateCourseDetail = () => {
    navigate(
      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_list}/${item.id}`
    );
  };

  if (isSkeleton) {
    return (
      <Stack
        sx={{
          marginTop: MetricSize.medium_15,
          marginLeft: '10px',
          borderColor: Color.grey,
          borderRadius: MetricSize.small_5,
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Skeleton height={400} />
      </Stack>
    );
  }

  return (
    <UserCourseItem
      courseDescription={item.courseDescription}
      courseName={item.courseName}
      imageAlt="Hình ảnh khóa học"
      imageUrl={item.imageUrl}
      courseType={item.courseType}
      courseStatus={item.status}
      onClick={handleNavigateCourseDetail}
    />
  );
}

MentorCourseItem.defaultProps = {
  isSkeleton: false,
  item: undefined,
};
