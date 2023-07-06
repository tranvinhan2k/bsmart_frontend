import { Navigate } from 'react-router-dom';
import {
  NavigationLink,
  MemberNavigationActionLink,
} from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import MemberCourseListPage from '~/pages/MemberCourseListPage';
import WalletManagementPage from '~/pages/WalletManagementPage';
import WithdrawPage from '~/pages/WithdrawPage';
import {
  MemberEditPersonalInfoPage,
  MemberEditImgInfoPage,
  MemberEditPasswordPage,
} from '~/routes/components';

export const memberRoutes: RoutePayload[] = [
  {
    path: '/',
    main: () => (
      <Navigate
        to={`/${NavigationLink.member_details}/${MemberNavigationActionLink.edit_profile_personal_info}`}
      />
    ),
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberNavigationActionLink.edit_profile_personal_info,
    main: () => <MemberEditPersonalInfoPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberNavigationActionLink.edit_profile_img,
    main: () => <MemberEditImgInfoPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberNavigationActionLink.edit_profile_password,
    main: () => <MemberEditPasswordPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberNavigationActionLink.wallet_management,
    main: () => <WalletManagementPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberNavigationActionLink.withdraw,
    main: () => <WithdrawPage />,
    role: ['ROLE_STUDENT'],
  },
  {
    path: MemberNavigationActionLink.member_course_list,
    main: () => <MemberCourseListPage />,
    role: ['ROLE_STUDENT'],
  },
];
