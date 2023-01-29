import { ClassStatus, TypeOfClass } from '@/models/class'
import { RoleType } from '@/models/role'
import { ReactNode } from 'react'

export interface ListResponse<T> {
  items: T[]
  pageItemSize?: number
  currentPage?: number
  totalPages?: number
  totalItems?: number
  pageSize?: number
  first?: boolean
  last?: boolean
  error_message?: string
}

export interface FilterParams {
  page?: number
  size?: number
  status?: ClassStatus
  sort?: string[]
  numberSlot?: number
  subject?: number
  classType?: TypeOfClass
  q?: string // search
  type?: string
}
export interface RegisterPayload {
  account: {
    username: string
    password: string
  }
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  genderCode: string
}
export interface Pagination {
  page?: number
  size?: number
  totalPages?: number
  total?: number
}

export interface City {
  name: string
}

export interface Action {
  label: string
  value: string
  icon?: ReactNode
  variant?: 'outlined' | 'contained' | 'text'
}

export interface TabPayload {
  id: number
  label: string
  status: ClassStatus
}

export interface UpdateAccountStudentPayload {
  firstName: string
  lastName: string
  birthDay: string
  phone: string
  mail: string
  role: RoleType
  gender: string
  active: boolean
}
