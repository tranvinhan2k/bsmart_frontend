import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '~/components/molecules/MainHeader';
import LoginModal from '~/components/molecules/modals/LoginModal';
import {
  AuthorizationActionData,
  HeaderContractDataList,
  HeaderSocialDataList,
} from '~/constants';

const SEARCH_BAR_LABEL = 'Tìm kiếm khóa học';

export default function MainHeaderSection() {
  const navigate = useNavigate();

  const [isLoginModalVisisble, setLoginModalVisisble] =
    useState<boolean>(false);

  const handleSearchValue = (searchValue: string) => {
    // TODO: add feature search value
  };

  const handleTriggerLoginModal = () => {
    setLoginModalVisisble(!isLoginModalVisisble);
  };

  const handleNavigateRegister = () => {
    navigate(AuthorizationActionData[1].link);
  };

  return (
    <>
      <MainHeader
        searchLabel={SEARCH_BAR_LABEL}
        authenticationData={AuthorizationActionData}
        socials={HeaderSocialDataList}
        contracts={HeaderContractDataList}
        onSearchText={handleSearchValue}
        onLoginClick={handleTriggerLoginModal}
        onRegisterClick={handleNavigateRegister}
      />
      <LoginModal
        visible={isLoginModalVisisble}
        onClick={handleTriggerLoginModal}
      />
    </>
  );
}
