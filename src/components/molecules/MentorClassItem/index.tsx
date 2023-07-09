import { mockLevelData } from '~/constants';
import UserCourseItem from '../UserCourseItem';
import { LevelKeys } from '~/models/variables';

interface Props {
  item?: any;
  isSkeleton?: boolean;
  onClick?: () => void;
  refetch: () => void;
}

export default function MentorClassItem({
  item,
  isSkeleton = false,
  onClick = () => {},
  refetch,
}: Props) {
  return (
    <UserCourseItem
      level={mockLevelData[0].value as LevelKeys}
      courseDescription={item.courseDescription}
      courseName={item.subCourseName}
      imageAlt="Hình ảnh khóa học"
      imageUrl={item.imageUrl}
      // courseType={item.courseType}
      courseStatus={item.status}
    />
  );
}

MentorClassItem.defaultProps = {
  isSkeleton: false,
  item: undefined,
  onClick: () => {},
};
