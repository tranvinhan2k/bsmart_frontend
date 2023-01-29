import { ClassStatus, Module } from '@/models/class'
import { Gender } from '@/models/genders'
import { RolePayload } from '@/models/role'

export interface MarkPayload {
  module: Module
  markDto: Mark
}

export interface Mark {
  created: string
  lastModified: string
  createdBy: string
  lastModifiedBy: string
  id: number
  student: {
    id: number
    firstName: string
    lastName: string
    role: RolePayload
    gender: Gender
    avatar: string
    status: ClassStatus
    level: string
  }
  mark: number
  maxMark: number
  minMark: number
}
