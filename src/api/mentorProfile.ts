import axiosClient from '~/api/axiosClient';
import { CheckMentorProfilesCompletenessReturnPayload } from '~/models/mentorProfiles';

const url = `/mentor-profiles`;

const mentorProfilesApi = {
  checkMentorProfilesCompleteness(): Promise<
    CheckMentorProfilesCompletenessReturnPayload | undefined
  > {
    const urlGet = `${url}/completeness`;
    return axiosClient.get(urlGet);
  },

  requestApproval(idMentorProfiles: number): Promise<any> {
    const urlPut = `${url}/${idMentorProfiles}/request-approval`;
    return axiosClient.put(urlPut);
  },
};

export default mentorProfilesApi;
