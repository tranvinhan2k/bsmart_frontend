import { Navigate } from 'react-router-dom';
import { MemberNavigationActionLink } from '~/constants/routeLink';
import { RoutePayload } from '~/models/routes';
import WalletManagementPage from '~/pages/WalletManagementPage';
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
        replace
        to={MemberNavigationActionLink.edit_profile_personal_info}
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
];
