import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ResponseProfilePayload } from '~/api/users';
import MainHeader from '~/components/molecules/MainHeader';
import LoginModal from '~/components/molecules/modals/LoginModal';
import {
  AuthorizationActionData,
  HeaderContractDataList,
  HeaderSocialDataList,
} from '~/constants';
import { useMutationProfile } from '~/hooks';
import { Role } from '~/models/role';
import { changeFilterParams } from '~/redux/courses/slice';
import { selectToken } from '~/redux/user/selector';
import { signIn } from '~/redux/user/slice';
import toast from '~/utils/toast';

const SEARCH_BAR_LABEL = 'Tìm kiếm khóa học';

export default function MainHeaderSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  const getProfileMutation = useMutationProfile();

  const [isLoginModalVisisble, setLoginModalVisisble] =
    useState<boolean>(false);
  const { initialized, keycloak } = useKeycloak();

  const handleSearchValue = (searchValue: string) => {
    dispatch(
      changeFilterParams({
        q: searchValue,
        categoryId: undefined,
        page: 0,
        provinces: undefined,
        size: 9,
        sort: undefined,
        subjectId: undefined,
        types: undefined,
      })
    );
    navigate('/course_menu');
  };

  const handleTriggerLoginModal = () => {
    setLoginModalVisisble(!isLoginModalVisisble);
  };
  const handleLoginKeycloak = async () => {
    await keycloak.login();
  };

  const handleNavigateRegister = () => {
    navigate(AuthorizationActionData[1].link);
  };

  useEffect(() => {
    async function getProfile() {
      console.log('token');

      const { token: keycloakToken } = keycloak;
      localStorage.setItem('token', `${keycloakToken}`);

      const responseProfile = await getProfileMutation.mutateAsync();
      localStorage.setItem('roles', responseProfile.roles[0].code);

      const requestProfile: {
        token: string;
        roles: Role;
        profile: ResponseProfilePayload;
      } = {
        token: `${keycloakToken}`,
        roles: responseProfile.roles[0].code as Role,
        profile: responseProfile,
      };
      dispatch(signIn(requestProfile));
    }
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keycloak]);

  return (
    <>
      <MainHeader
        searchLabel={SEARCH_BAR_LABEL}
        authenticationData={AuthorizationActionData}
        socials={HeaderSocialDataList}
        contracts={HeaderContractDataList}
        onSearchText={handleSearchValue}
        onLoginClick={handleLoginKeycloak}
        onRegisterClick={handleNavigateRegister}
      />
      {!token && (
        <LoginModal
          visible={isLoginModalVisisble}
          onClick={handleTriggerLoginModal}
        />
      )}
    </>
  );
}
