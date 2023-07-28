import { SxProps, Theme } from '@mui/material';
import { IconName } from '~/components/atoms/Icon';
import { ClassStatusKeys, CourseStatusKeys } from './variables';

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
  icon?: IconName;
  items?: ActionPayload[];
  courseStatus?: CourseStatusKeys;
  classStatus?: ClassStatusKeys;
}

export interface TabPayload {
  index: number;
  label: string;
}

export interface OptionPayload {
  id: number;
  label: string;
  value: string;
  categoryIds?: number[];
  content?: string;
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

export interface DropdownDynamicValueInputBooleanDataPayload {
  id: number;
  label: string;
  value: boolean;
}
export interface DropdownDynamicValueInputNumberDataPayload {
  id: number;
  label: string;
  value: number;
}
export interface DropdownDynamicValueInputStringDataPayload {
  id: number;
  label: string;
  value: string;
}
export interface ImageType {
  id: number;
  name: string;
  url: string;
  status: boolean;
  type: string;
}

export interface TimeInWeeks {
  dayOfWeek: DayOfWeek;
  slot: Slot;
}

interface DayOfWeek {
  id: number;
  name: string;
  code: string;
}

interface Slot {
  id: number;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
}

export type StyleMUIType = SxProps<Theme>;
