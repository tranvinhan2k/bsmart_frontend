import { MentorClassActionLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const MentorClassNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    link: MentorClassActionLink.information,
    name: 'Thông tin lớp học',
    icon: 'class',
    classStatus: 'ALL',
  },
  {
    id: 1,
    link: MentorClassActionLink.students,
    name: 'Danh sách học sinh',
    icon: 'person',
  },
  {
    id: 2,
    link: MentorClassActionLink.schedule,
    name: 'Lịch học của lớp',
    icon: 'date',
  },
  {
    id: 3,
    link: MentorClassActionLink.attendance,
    name: 'Điểm danh',
    icon: 'attendance',
  },
  {
    id: 4,
    link: MentorClassActionLink.activity,
    name: 'Nội dung lớp học',
    icon: 'book',
  },
  {
    id: 8,
    link: MentorClassActionLink.feedback,
    name: 'Đánh giá từ học sinh',
    icon: 'feedback',
  },
];
