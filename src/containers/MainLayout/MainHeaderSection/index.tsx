import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainHeader from '~/components/molecules/MainHeader';
import LoginModal from '~/components/molecules/modals/LoginModal';
import {
  AuthorizationActionData,
  HeaderContractDataList,
  HeaderSocialDataList,
} from '~/constants';
import { selectToken } from '~/redux/user/selector';

const SEARCH_BAR_LABEL = 'Tìm kiếm khóa học';

export default function MainHeaderSection() {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
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
      {!token && (
        <LoginModal
          visible={isLoginModalVisisble}
          onClick={handleTriggerLoginModal}
        />
      )}
    </>
  );
}
