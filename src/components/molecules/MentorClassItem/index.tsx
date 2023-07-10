import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import ClassItem from '../items/ClassItem';

interface Props {
  item?: any;
  isSkeleton?: boolean;
  onClick?: () => void;
  refetch: () => void;
}

export default function MentorClassItem({ item }: Props) {
  const tmpItem: DetailCourseClassPayload = {
    code: '',
    endDate: '',
    id: '0',
    imageAlt: '',
    imageUrl: '',
    maxStudent: 0,
    minStudent: 0,
    numberOfSlot: 10,
    price: 0,
    startDate: '',
    timeInWeekRequests: [
      {
        dayOfWeekId: 0,
        slotId: 0,
      },
    ],
  };
  const {
    code,
    endDate,
    id,
    imageAlt,
    imageUrl,
    maxStudent,
    minStudent,
    numberOfSlot,
    price,
    startDate,
    timeInWeekRequests,
  } = tmpItem;
  return (
    <ClassItem
      code={code}
      endDate={endDate}
      id={0}
      imageUrl={imageUrl}
      maxStudent={maxStudent}
      minStudent={minStudent}
      startDate={startDate}
      timetable={timeInWeekRequests}
    />
  );
}

MentorClassItem.defaultProps = {
  isSkeleton: false,
  item: undefined,
  onClick: () => {},
};
