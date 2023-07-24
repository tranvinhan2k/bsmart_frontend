import { useNavigate } from 'react-router-dom';
import UserClassItem from '../items/UserClassItem';
import { ClassMenuItemPayload } from '~/models/type';
import {
  MemberDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';

interface Props {
  item?: ClassMenuItemPayload;
}

export default function MemberClassItem({ item }: Props) {
  const navigate = useNavigate();
  const handleNavigateDetailClass = () => {
    navigate(
      `/${NavigationLink.dashboard}/${MemberDashboardNavigationActionLink.class_detail}/${item?.id}`
    );
  };
  const handleAddFeedback = () => {};
  return (
    <UserClassItem
      code={item?.code}
      imageAlt={item?.imageAlt}
      imageUrl={item?.imageUrl}
      name={item?.name}
      onClick={handleNavigateDetailClass}
      progressValue={item?.progressValue}
      status={item?.status || 'ALL'}
      subjectId={item?.subjectId || -1}
      onAddFeedback={item?.id === 1 ? handleAddFeedback : undefined}
      teacherName={item?.teacherName}
    />
  );
}
