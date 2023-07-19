import { MemberClassActionLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const MemberClassNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    link: MemberClassActionLink.information,
    name: 'Thông tin lớp học',
    icon: 'class',
    classStatus: 'ALL',
  },
  {
    id: 1,
    link: MemberClassActionLink.students,
    name: 'Danh sách học sinh',
    icon: 'person',
  },
  {
    id: 2,
    link: MemberClassActionLink.schedule,
    name: 'Lịch làm việc',
    icon: 'date',
  },
  {
    id: 3,
    link: MemberClassActionLink.attendance,
    name: 'Điểm danh',
    icon: 'attendance',
  },
  {
    id: 4,
    link: MemberClassActionLink.activity,
    name: 'Nội dung lớp học',
    icon: 'book',
  },
  {
    id: 5,
    link: MemberClassActionLink.notification,
    name: 'Thông báo lớp học',
    icon: 'account',
  },
];
