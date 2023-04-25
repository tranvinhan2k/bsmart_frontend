import { IconName } from '~/components/atoms/Icon';
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

export interface ImagePayload {
  id: number;
  name: string;
  url: string;
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

export interface PaginationPayload {
  page: number;
  size: number;
  sort: string;
}

export interface RequestPagingFilterPayload {
  page: number;
  size: number;
  sort: string[] | undefined;
  status?:
    | 'REQUESTING'
    | 'WAITING'
    | 'EDITREQUEST'
    | 'REJECTED'
    | 'NOTSTART'
    | 'STARTING'
    | 'ENDED'
    | 'CANCEL'
    | 'ALL';
}
