import MainFooter from '~/components/molecules/MainFooter';
import { AddressData, FooterContractDataList } from '~/constants';
import { NavigationActionData } from '~/routes/navigators';

export default function MainFooterSection() {
  return (
    <MainFooter
      addresses={AddressData}
      contracts={FooterContractDataList}
      navigateList={NavigationActionData}
    />
  );
}
