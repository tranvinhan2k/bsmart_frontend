import { useNavigate } from 'react-router-dom';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import UserClassItem from '../items/UserClassItem';
import { image } from '~/constants/image';
import { ClassMenuItemPayload } from '~/models/type';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';

interface Props {
  item?: ClassMenuItemPayload;
}

export default function MentorClassItem({ item }: Props) {
  const navigate = useNavigate();
  const handleNavigateDetailClass = () => {
    navigate(
      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_detail}/${item?.id}`
    );
  };
  const handleAddFeedback = () => {};
  const handleUpdateFeedback = () => {};
  return (
    <UserClassItem
      imageAlt={item?.imageAlt}
      imageUrl={item?.imageUrl}
      name={item?.name}
      onClick={handleNavigateDetailClass}
      progressValue={item?.progressValue}
      status={item?.status || 'ALL'}
      subjectId={item?.subjectId || -1}
      // onAddFeedback={item?.id === 1 ? handleAddFeedback : undefined}
      teacherName={['Trần Vĩ Nhân']}
    />
  );
}

MentorClassItem.defaultProps = {};
