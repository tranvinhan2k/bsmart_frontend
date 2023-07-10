export const enum AuthorizationALink {
  log_in = 'login',
  register = 'register',
}

export const enum NavigationLink {
  homepage = 'homepage',
  about_us = 'about_us',
  course_menu = 'course_menu',
  mentor_profile = 'mentor-profile',
  blog = 'blog',
  recruitment = 'recruitment',
  register = 'register',
  login = 'login',
  course_menu_details = 'course_menu/course-detail',
  lms = 'lms',
  annotation = 'annotation',
  buy_course = 'buy-course',
  blog_details = 'blog/blog-details/:id',
  member_details = 'member-details',
  feedback = 'feedback',
  mentor_menu = 'mentor_menu',
  cart = 'cart',
  contact = 'contact',
  check_out = 'check_out',
  confirm_email = 'confirm_email/:code',
  dashboard = 'dashboard',
}

export const enum MemberNavigationActionLink {
  edit_profile_personal_info = 'edit-profile',
  edit_profile_img = 'edit-profile-img',
  edit_profile_password = 'edit-profile-password',
  wallet_management = 'wallet-management',
  withdraw = 'withdraw',
  member_course_list = 'member-course-list',
}

export const enum MentorNavigationLink {
  edit_profile_personal_info = 'edit-profile',
  edit_profile_mentor_info = 'edit-profile-mentor',
  edit_profile_img = 'edit-profile-img',
  edit_profile_password = 'edit-profile-password',
  wallet_management = 'wallet-management',
  withdraw = 'withdraw',
}
export const enum MentorDashboardNavigationActionLink {
  mentor_menu_dashboard = 'mentor-menu',
  // Quản lí học tập
  mentor_course_list = 'mentor-course-list',
  create_course = 'create-course',
  mentor_class_list = 'mentor-class-list',
  // Trang tạm - Khóa học
  mentor_class_detail_1 = 'mentor-class-detail',
  mentor_class_detail_2 = 'mentor_course_detail/:id',
  // Trang tạm - Nội dung
  create_content = 'create-content',
  // Trang tạm - Hoạt động
  mentor_quiz_settings = 'mentor-quiz-settings',
  mentor_create_quiz = 'mentor-create-quiz/:classSectionId',
  mentor_assignment_settings_1 = 'mentor-assignment-settings',
  mentor_create_assignment = 'mentor-create-assignment/:classSectionId',
  mentor_assignment_settings_2 = 'mentor-assignment-settings/:id',
  mentor_assignment_details = 'mentor-assignment-details/:id',
  // Trang tạm - Thông báo
  mentor_announcement_settings = 'mentor-announcement-settings',
  mentor_create_announcement = 'mentor-create-announcement/:idClassSection',
  mentor_update_announcement = 'mentor-update-announcement/:idAnnouncement',
  // Trang tạm - Điểm danh
  attendance_list = 'attendance-list',
  view_member_attendance = 'view-member-attendance',
  take_attendance = 'take-attendance/:classId/:id',
  schedule = 'schedule',
}
export const enum StudentDashboardNavigationActionLink {}
export const enum MentorLink {
  TakeAttendance = 'mentor-profile/take-attendance',
  ViewCourseDetails = 'mentor-profile/take-attendance',
}

export const enum AdminNavigationActionLink {
  admin = 'admin',
  wallet_management = 'wallet-management',
  feedback_manager = 'feedback_manager',
  subject_manager = 'subject_manager',
  category_manager = 'category_manager',
}

export const enum ManagerNavigationActionLink {
  manager = 'manager',
  account_search = 'account_search',
  process_register_request_search = 'process_register_request_search',
  process_register_request_details = 'process_register_request_details/:id',
  course_search = 'course_search',
  process_create_course_request_search = 'process_create_course_request_search',
  process_create_course_request_details = 'process_create_course_request_details/:id',
}
