import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainHeader from '~/components/molecules/MainHeader';
import LoginModal from '~/components/molecules/modals/LoginModal';
import {
  AuthorizationActionData,
  HeaderContractDataList,
  HeaderSocialDataList,
} from '~/constants';
import { changeFilterParams } from '~/redux/courses/slice';
import { selectToken } from '~/redux/user/selector';

const SEARCH_BAR_LABEL = 'Tìm kiếm khóa học';

export default function MainHeaderSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const [isLoginModalVisisble, setLoginModalVisisble] =
    useState<boolean>(false);

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
