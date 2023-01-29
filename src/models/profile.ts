import { ClassLevelPayload } from '@/models/classLevel'
import { Gender } from '@/models/genders'
import { ResourceResponsePayload } from '@/models/resource'
import { Subject } from '@/models/subject'
import { ResourceFile, UploadFile } from '@/models/teacherRegister'
import { VoicePayload } from '@/models/voice'

export interface Profile {
  accountDetail: {
    status: feedbackStatus
    id: number
    avatar: string
    accountId: number
    userName: string
    firstName: string
    lastName: string
    birthDay: string
    email: string
    phone: string
    domicile: string
    teachingProvince: string
    voice: VoicePayload
    gender: Gender
    currentAddress: string
    idCard: string
    trainingSchoolName: string
    majors: string
    classLevel: ClassLevelPayload[]
    resources?: ResourceFile[]
    active: boolean
    keycloak: boolean
    level: string
    subjects?: Subject[]
  }
  feedbackAccountLog: FeedbackLogPayload[]
}
export type feedbackStatus = 'REQUESTING' | 'REFUSE' | 'EDITREQUEST' | 'APPROVE'
export interface FeedbackLogPayload {
  id: number
  content: string
  status: feedbackStatus
  account: number
  accountDetail: number
  createDate: string
}
