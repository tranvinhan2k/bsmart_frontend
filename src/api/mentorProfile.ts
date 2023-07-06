import axiosClient from '~/api/axiosClient';
import { CheckCompletenessReturnPayload } from '~/models/mentorProfiles';

const url = `/mentor-profiles`;

export interface ProcessRegisterRequestPayload {
  id: number;
  status: string;
  message: string;
}

const mentorProfilesApi = {
  checkCompleteness(): Promise<CheckCompletenessReturnPayload | undefined> {
    const urlGet = `${url}/completeness`;
    return axiosClient.get(urlGet);
  },

  requestApproval(idMentorProfiles: number): Promise<any> {
    const urlPut = `${url}/${idMentorProfiles}/request-approval`;
    return axiosClient.put(urlPut);
  },
};

export default mentorProfilesApi;
