import MainFooter from '~/components/molecules/MainFooter';
import {
  AddressData,
  FooterContractDataList,
  NavigationActionData,
} from '~/constants';

export default function MainFooterSection() {
  return (
    <MainFooter
      addresses={AddressData}
      contracts={FooterContractDataList}
      navigateList={NavigationActionData}
    />
  );
}
