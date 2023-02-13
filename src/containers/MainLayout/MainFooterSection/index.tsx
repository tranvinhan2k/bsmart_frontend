import MainFooter from '~/components/footers/MainFooter';
import { AddressData, NavigationActionData } from '~/constants';
import { FooterContractDataList } from '~/constants/contract';

export default function MainFooterSection() {
  return (
    <MainFooter
      addresses={AddressData}
      contracts={FooterContractDataList}
      navigateList={NavigationActionData}
    />
  );
}
