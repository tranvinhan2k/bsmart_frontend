import { Color, IconSize, MetricSize } from '~/assets/variables';

export type ColorKeys = keyof typeof Color;
export type IconSizeKeys = keyof typeof IconSize;
export type MetricSizeKeys = keyof typeof MetricSize;
export type TypeLearnKeys = 'ONLINE' | 'OFFLINE';
export type LevelKeys = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type RoleKeys = 'STUDENT' | 'TEACHER' | 'ADMIN';
export type CRUDModes = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
export type ClassStatusKeys =
  | 'REQUESTING'
  | 'WAITING'
  | 'EDITREQUEST'
  | 'REJECTED'
  | 'NOTSTART'
  | 'STARTING'
  | 'ENDED'
  | 'CANCEL';
