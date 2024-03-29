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
  mentor_menu_details = 'mentor_menu/mentor-detail',
  cart = 'cart',
  contact = 'contact',
  check_out = 'check_out',
  confirm_email = 'confirm_email/:code',
  dashboard = 'dashboard',
  forgot_password = 'forgot_password',
  policy = 'policy',
  payment_report = 'payment_report',
  login_google = 'login-success',
}

export const enum MemberNavigationActionLink {
  edit_profile_personal_info = 'edit-profile',
  edit_profile_password = 'edit-profile-password',
  wallet_management = 'wallet-management',
  member_course_list = 'member-course-list',
}

export const enum MentorNavigationLink {
  edit_profile_personal_info = 'edit-profile',
  edit_profile_mentor_info = 'edit-profile-mentor',
  edit_profile_password = 'edit-profile-password',
  send_request = 'send_request',
  wallet_management = 'wallet-management',
  withdraw = 'withdraw',
}
export const enum MentorDashboardNavigationActionLink {
  mentor_menu_dashboard = 'mentor-menu',
  review = 'do_review',
  // Quản lí học tập
  mentor_course_list = 'courses',
  mentor_course_detail = 'courses/detail',
  create_course = 'courses/create-course',
  mentor_class_list = 'classes',
  // Trang tạm - Khóa học
  mentor_class_detail = 'classes/detail',
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
export const enum MemberDashboardNavigationActionLink {
  course_list = 'courses',
  course_detail = 'courses/detail',
  class_list = 'classes',
  class_detail = 'classes/detail',
  schedule = 'schedule',
  attendance = 'attendance',
  quiz = 'do_quiz',
  review = 'do_review',
  promo = 'promo',
  ask_ai = 'ask_ai',
}
export const enum MentorLink {
  TakeAttendance = 'mentor-profile/take-attendance',
  ViewCourseDetails = 'mentor-profile/take-attendance',
}

export const enum AdminNavigationActionLink {
  // admin = 'admin',
  // confirm_email = 'confirm_email/:code',
  // user_manager = 'user_manager',
  // revenue = 'revenue',
  // wallet_management = 'wallet-management',
  // questions_bank = 'questions_bank_manager',
  admin_analytic = 'admin_analytic',
  admin_withdraw_request = 'admin_withdraw_request',
  admin_referral_code = 'admin_referral_code',
  admin_feedback = 'admin_feedback',
}

export const enum ManagerNavigationActionLink {
  // manager = 'manager',
  // questions_bank = 'questions_bank',
  // confirm_email = 'confirm_email/:code',
  manager_request = 'manager_request',
  manager_user = 'manager_user',
  manager_course = 'manager_course',
  manager_class = 'manager_class',
  manager_subject = 'manager_subject',
  manager_category = 'manager_category',
}

export const enum MentorCourseActionLink {
  tutorial = 'tutorial',
  edit_request = 'edit-request',
  classes = 'classlist',
  information = 'information',
  content = 'content',
}
export const enum MentorClassActionLink {
  information = 'information',
  students = 'student',
  student_detail = 'student-detail',
  schedule = 'schedule',
  attendance = 'attendance',
  take_attendance = 'take-attendance',
  activity = 'activity',
  notification = 'notification',
  points = 'points',
  assignments = 'assignments',
  feedback = 'feedback',
  mark_report = 'mark-report',
}
export const enum MemberClassActionLink {
  information = 'information',
  mentor = 'mentors',
  schedule = 'schedule',
  attendance = 'attendance',
  activity = 'activity',
  notification = 'notification',
  mark_report = 'mark-report',
}

export const enum ActivityLink {
  lesson = 'lesson',
  quiz = 'quiz',
  assignment = 'assignment',
  resource = 'resource',
}
