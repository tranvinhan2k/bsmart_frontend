import { MemberDashboardNavigationActionLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const StudentDashboardNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    icon: 'class',
    name: 'Danh sách lớp học',
    link: MemberDashboardNavigationActionLink.class_list,
  },
  {
    id: 1,
    link: MemberDashboardNavigationActionLink.schedule,
    name: 'Lịch học',
    icon: 'date',
  },
  {
    id: 2,
    link: MemberDashboardNavigationActionLink.attendance,
    name: 'Điểm danh - Tạm',
    icon: 'date',
  },
];
