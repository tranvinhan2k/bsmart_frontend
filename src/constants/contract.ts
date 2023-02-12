import mail from '~/assets/images/icons8_mail_52px.png';
import phone from '~/assets/images/icons8_phone_52px.png';
import location from '~/assets/images/icons8_location_52px.png';
import { ContractPayload } from '~/models';

export const HeaderContractDataList: ContractPayload[] = [
  { name: 'Email', image: mail, value: 'bsmart@gmail.com' },
  { name: 'Số Điện Thoại', image: phone, value: '+98 946005077' },
];
export const FooterContractDataList: ContractPayload[] = [
  { name: 'Địa chỉ', image: location, value: '260/19 Tân Binh, Hồ Chí Minh' },
  { name: 'Email', image: mail, value: 'bsmart@gmail.com' },
  { name: 'Số điện thoại', image: phone, value: '+98 946005077' },
];

export default {};
