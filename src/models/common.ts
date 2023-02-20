import { IconName } from '~/models/icon';

export interface SocialPayload {
  name: string;
  link: string;
  image: IconName;
}

export interface ContractPayload {
  name: string;
  value: string;
  image: IconName;
}

export interface ActionPayload {
  isHide?: boolean;
  name: string;
  link: string;
}

export interface TabPayload {
  index: number;
  label: string;
}

export interface CheckBoxPayload {
  id: number;
  label: string;
  value: string;
}
