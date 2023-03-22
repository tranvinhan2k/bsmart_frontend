import { IconName } from '~/components/atoms/Icon';
import { CoursePayload } from './courses';
import { Role } from './role';

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
  id: number;
  isHide?: boolean;
  name: string;
  link: string;
  role?: Role;
}

export interface TabPayload {
  index: number;
  label: string;
}

export interface OptionPayload {
  id: number;
  label: string;
  value: string;
}

export interface PagingFilterPayload<ItemType> {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  first: boolean;
  last: boolean;
  pageItemSize: number;
  pageSize: number;
  items: ItemType[];
}
