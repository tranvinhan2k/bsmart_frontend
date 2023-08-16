import { Navigate } from 'react-router-dom';
import { MentorNavigationLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import WalletManagementPage from '~/pages/WalletManagementPage';
import WithdrawPage from '~/pages/WithdrawPage';
import {
  MentorEditPersonalInfoPage,
  MentorEditMentorProfile,
  MentorEditPasswordPage,
  MentorSendRequestPage,
  NotFoundPage,
} from '~/routes/components';

export const mentorRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => (
      <Navigate to={MentorNavigationLink.edit_profile_personal_info} replace />
    ),
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorNavigationLink.edit_profile_personal_info,
    main: () => <MentorEditPersonalInfoPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorNavigationLink.edit_profile_mentor_info,
    main: () => <MentorEditMentorProfile />,
    role: ['ROLE_TEACHER'],
  },
  // {
  //   path: MentorNavigationLink.edit_profile_img,
  //   main: () => <MentorEditProfileImgPage />,
  //   role: ['ROLE_TEACHER'],
  // },
  {
    path: MentorNavigationLink.edit_profile_password,
    main: () => <MentorEditPasswordPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorNavigationLink.wallet_management,
    main: () => <WalletManagementPage />,
    role: ['ROLE_TEACHER'],
  },
  {
    path: MentorNavigationLink.send_request,
    main: () => <MentorSendRequestPage />,
    role: ['ROLE_TEACHER'],
  },
  // {
  //   path: MentorNavigationLink.send_request,
  //   main: () => <WithdrawPage />,
  //   role: ['ROLE_TEACHER'],
  // },
  {
    path: '*',
    main: () => <NotFoundPage />,
    role: [],
  },
];
