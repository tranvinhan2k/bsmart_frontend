export type ResourceType = 'CARDPHOTO' | 'CMNDONE' | 'CMNDTWO' | 'DEGREE'

export interface ResourceResponsePayload {
  id: number
  name: string
  resourceType: ResourceType
  url: string
}
