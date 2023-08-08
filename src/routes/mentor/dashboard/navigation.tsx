import { MentorDashboardNavigationActionLink } from '~/constants/routeLink';
import { ActionPayload } from '~/models';

export const MentorDashboardNavigationActionData: ActionPayload[] = [
  {
    id: 0,
    icon: 'course',
    name: 'Danh sách khóa học',
    link: MentorDashboardNavigationActionLink.mentor_course_list,
  },
  {
    id: 1,
    icon: 'class',
    name: 'Danh sách lớp học',
    link: MentorDashboardNavigationActionLink.mentor_class_list,
  },
  {
    id: 2,
    icon: 'course',
    isHide: true,
    link: '',
    name: 'Trang tạm - Khóa học',
    items: [
      {
        id: 0,
        name: 'Khóa học - Chi tiết khóa học (1)',
        link: MentorDashboardNavigationActionLink.mentor_class_detail,
      },
    ],
  },
  {
    id: 3,
    icon: 'course',
    isHide: true,

    link: '',
    name: 'Trang tạm - Nội dung',
    items: [
      {
        id: 0,
        name: 'Nội dung - Tạo',
        link: MentorDashboardNavigationActionLink.create_content,
      },
    ],
  },
  {
    id: 4,
    icon: 'course',
    isHide: true,

    link: '',
    name: 'Trang tạm - Hoạt động',
    items: [
      {
        id: 0,
        name: 'Quiz - Xem chi tiết',
        link: MentorDashboardNavigationActionLink.create_content,
      },
      {
        id: 1,
        name: 'Quiz - Tạo',
        link: MentorDashboardNavigationActionLink.mentor_create_quiz,
      },
      {
        id: 2,
        name: 'Assignment - Xem chi tiết (1)',
        link: MentorDashboardNavigationActionLink.mentor_assignment_settings_1,
      },
      {
        id: 3,
        name: 'Assignment - Tạo',
        link: MentorDashboardNavigationActionLink.mentor_create_assignment,
      },
      {
        id: 4,
        name: 'Assignment - Chỉnh sửa',
        link: MentorDashboardNavigationActionLink.mentor_assignment_settings_2,
      },
      {
        id: 5,
        name: 'Assignment - Xem chi tiết (2)',
        link: MentorDashboardNavigationActionLink.mentor_assignment_details,
      },
    ],
  },
  {
    id: 5,
    isHide: true,

    icon: 'course',
    link: '',
    name: 'Trang tạm - Thông báo',
    items: [
      {
        id: 0,
        name: 'Announcement - Cập nhật',
        link: MentorDashboardNavigationActionLink.mentor_announcement_settings,
      },
      {
        id: 1,
        name: 'Announcement - Tạo',
        link: MentorDashboardNavigationActionLink.mentor_create_announcement,
      },
      {
        id: 2,
        name: 'Announcement - Cập nhật',
        link: MentorDashboardNavigationActionLink.mentor_update_announcement,
      },
    ],
  },
  {
    id: 6,
    isHide: true,

    icon: 'course',
    link: '',
    name: 'Trang tạm - Điểm danh',
    items: [
      {
        id: 0,
        name: 'Danh sách điểm danh (1)',
        link: MentorDashboardNavigationActionLink.attendance_list,
      },
      {
        id: 1,
        name: 'Danh sách điểm danh (2)',
        link: MentorDashboardNavigationActionLink.view_member_attendance,
      },
      {
        id: 2,
        name: 'Danh sách điểm danh (3)',
        link: MentorDashboardNavigationActionLink.take_attendance,
      },
    ],
  },
  {
    id: 7,
    link: MentorDashboardNavigationActionLink.schedule,
    name: 'Lịch dạy',
    icon: 'date',
  },
];
