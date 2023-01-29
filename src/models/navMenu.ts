import { PermissionKey } from './permisstion'

export interface NavPayload {
  label: string
  link?: string
  value?: string
  items?: Array<NavPayLoadItem>
}
export interface SettingPayload {
  label: string
  value: string
  hasPermission: boolean
}

export interface NavPayLoadItem {
  label: string
  link: string
}
export interface LoginPayload {
  label: string
  value: string
}
export interface RegisterPayload {
  label: string
  value: string
  variant: 'outlined' | 'contained' | 'text'
}
