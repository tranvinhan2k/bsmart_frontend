export const PermissionKeys = {
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  MANAGER: 'MANAGER',
}

export type PermissionKey = keyof typeof PermissionKeys

export interface RolePermissionMap {
  STAFF: PermissionKey[]
  ADMIN: PermissionKey[]
}

export type RolePermissionMapKey = keyof RolePermissionMap
