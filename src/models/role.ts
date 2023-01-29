export type RoleType = 'STUDENT' | 'TEACHER' | 'MANAGER'

export interface RolePayload {
  id: number
  name: string
  code: RoleType
}
