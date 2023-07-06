import { DropdownDynamicValueInputStringDataPayload } from '~/models/common';

export interface EditPersonalProfilePayload {
  fullName: string;
  birthday: string;
  address: string;
  phone: string;
  gender: DropdownDynamicValueInputStringDataPayload;
}
