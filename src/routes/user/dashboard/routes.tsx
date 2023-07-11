import { Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { NavigationLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import CartPage from '~/pages/CartPage';
import CheckoutPage from '~/pages/CheckoutPage';
import {
  AboutUsPage,
  AnnotationPage,
  BlogDetailsPage,
  BlogPage,
  BuyCoursePage,
  ConfirmEmailPage,
  CourseDetailPage,
  CoursesPage,
  DashboardPage,
  FeedbackPage,
  HomePage,
  LmsPage,
  LoginPage,
  MemberProfilePage,
  MentorContractPage,
  MentorProfilePage,
  MentorsPage,
  NotFoundPage,
  RegisterPage,
  TestPage,
} from '~/routes/components';

export const routes: RoutePayload[] = [
  {
    path: '/',
    main: () => <Navigate to={NavigationLink.homepage} />,
    role: [],
  },
  {
    path: NavigationLink.homepage,
    main: () => <HomePage />,
    role: [],
  },
  {
    path: NavigationLink.about_us,
    main: () => <AboutUsPage />,
    role: [],
  },
  {
    path: NavigationLink.course_menu,
    role: [],
    main: () => <CoursesPage />,
  },
  {
    path: `/${NavigationLink.mentor_profile}/*`,
    main: () => <MentorProfilePage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: NavigationLink.blog,
    main: () => <BlogPage />,
    role: [],
  },
  {
    path: NavigationLink.recruitment,
    main: () => <Stack>Recruitment</Stack>,
    role: [],
  },
  {
    path: NavigationLink.register,
    main: () => <RegisterPage />,
    role: [],
  },
  {
    path: NavigationLink.login,
    main: () => <LoginPage />,
    role: [],
  },
  {
    path: `${NavigationLink.course_menu_details}/:id`,
    main: () => <CourseDetailPage />,
    role: ['ROLE_STUDENT', 'ROLE_TEACHER'],
  },
  {
    path: NavigationLink.lms,
    main: () => <LmsPage />,
    role: [],
  },
  {
    path: NavigationLink.annotation,
    main: () => <AnnotationPage />,
    role: ['ROLE_STUDENT', 'ROLE_TEACHER'],
  },
  {
    path: NavigationLink.buy_course,
    main: () => <BuyCoursePage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: NavigationLink.blog_details,
    main: () => <BlogDetailsPage />,
    role: ['ROLE_TEACHER', 'ROLE_STUDENT'],
  },
  {
    path: `/${NavigationLink.member_details}/*`,
    main: () => <MemberProfilePage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: NavigationLink.feedback,
    main: () => <FeedbackPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: NavigationLink.mentor_menu,
    main: () => <MentorsPage />,
    role: ['ROLE_STUDENT', 'ROLE_TEACHER'],
  },
  {
    path: NavigationLink.cart,
    main: () => <CartPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: NavigationLink.contact,
    main: () => <MentorContractPage />,
    role: [],
  },
  {
    path: NavigationLink.check_out,
    main: () => <CheckoutPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: NavigationLink.confirm_email,
    main: () => <ConfirmEmailPage />,
    role: ['ROLE_STUDENT', 'ROLE_TEACHER'],
  },
  {
    path: `/${NavigationLink.dashboard}/*`,
    main: () => <DashboardPage />,
    role: ['ROLE_STUDENT', 'ROLE_TEACHER'],
  },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
  {
    path: '/test_page',
    main: () => <TestPage />,
    role: [],
  },
];
