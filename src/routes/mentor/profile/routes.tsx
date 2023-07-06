import { Navigate } from 'react-router-dom';
import { MentorNavigationLink, NavigationLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import WalletManagementPage from '~/pages/WalletManagementPage';
import WithdrawPage from '~/pages/WithdrawPage';
import {
  MentorEditPersonalInfoPage,
  MentorEditMentorProfile,
  MentorEditProfileImgPage,
  MentorEditPasswordPage,
} from '~/routes/components';

export const mentorRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => (
      <Navigate
        to={`/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_personal_info}`}
      />
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
  {
    path: MentorNavigationLink.edit_profile_img,
    main: () => <MentorEditProfileImgPage />,
    role: ['ROLE_TEACHER'],
  },
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
    path: MentorNavigationLink.withdraw,
    main: () => <WithdrawPage />,
    role: ['ROLE_TEACHER'],
  },
];
