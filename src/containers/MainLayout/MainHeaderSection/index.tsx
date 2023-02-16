import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MainHeader from '~/components/molecules/MainHeader';
import LoginModal from '~/components/molecules/modals/LoginModal';
import {
  AuthorizationActionData,
  HeaderContractDataList,
  HeaderSocialDataList,
} from '~/constants';
import { defaultValueSignIn } from '~/form/defaultValues';
import { validationSchemaSignIn } from '~/form/validation';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';

const SEARCH_BAR_LABEL = 'Tìm kiếm khóa học';

export default function MainHeaderSection() {
  const navigate = useNavigate();
  const resolverSinIn = useYupValidationResolver(validationSchemaSignIn);
  const signInHookForm = useForm({
    defaultValues: defaultValueSignIn,
    resolver: resolverSinIn,
  });
  const [isLoginModalVisisble, setLoginModalVisisble] =
    useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChangeText = (changeText: string) => {
    setSearchValue(changeText);
  };

  const handleSearchValue = () => {
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
        searchValue={searchValue}
        authenticationData={AuthorizationActionData}
        socials={HeaderSocialDataList}
        contracts={HeaderContractDataList}
        onChangeText={handleChangeText}
        onSearchText={handleSearchValue}
        onLoginClick={handleTriggerLoginModal}
        onRegisterClick={handleNavigateRegister}
      />
      <LoginModal
        hookForm={signInHookForm}
        visible={isLoginModalVisisble}
        onClick={handleTriggerLoginModal}
      />
    </>
  );
}
