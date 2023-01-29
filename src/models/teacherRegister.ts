import { ResourceType } from '@/models/resource'

export interface UploadFile {
  resourceType: 'CARTPHOTO' | 'CCCDONE' | 'CCCDTWO' | 'DEGREE'|'AVATAR'
  file: File
}

export interface ResourceFile {
  id: number
  name: string
  url: string
  resourceType: ResourceType
}

export interface TeacherRegisterPayload {
  userName?: string
  firstName: string
  lastName: string
  birthDay: string
  email: string
  phone: string
  gender: string
  voiceId?: number
  currentAddress: string
  idCard?: string
  trainingSchoolName?: string
  majors?: string
  level?: string
  password?: string
  subjects?: number[]
  classLevels?: number[]
}
export interface TeacherRegisterFormData {
  username: string
  firstName: string
  lastName: string
  birthDay: string
  email: string
  phone: string
  gender: string
  voiceId?: string
  currentAddress: string
  idCard?: string
  trainingSchoolName?: string
  majors?: string
  level?: string
  password: string
  passwordConfirmation: string
  subjects?: number[]
  classLevels?: number[]
  files?: UploadFile[]
}
