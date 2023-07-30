import { ImagePayload } from './common';
import { SkillPayload } from './type';

export interface CheckCompletenessReturnPayload {
  percentComplete: number;
  missingInformation: [
    {
      requiredInfo: RequiredInfo;
      optionalInfo: OptionalInfo;
    }
  ];
  allowSendingApproval: boolean;
}

export interface RequiredInfo {
  fields: Field[];
}

export interface OptionalInfo {
  fields: Field[];
}

export interface Field {
  field: string;
  name: string;
}

export interface MentorProfileRequestInfoPayload {
  mentorSkillRequest: SkillPayload[];
  degreeRequest: ImagePayload[];
  created: string;
  totalSkillRequest: number;
  totalDegreeRequest: number;
}
