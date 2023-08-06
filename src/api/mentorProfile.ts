import axiosClient from '~/api/axiosClient';
import { UseMutationProcessUpdateMentorProfileRequestPayload } from '~/hooks/user/useMutationProcessUpdateMentorProfileRequest';
import { UseSearchMentorProfileUpdateRequestPayload } from '~/hooks/user/useSearchMentorProfileUpdateRequest';
import { PagingFilterPayload } from '~/models';
import {
  CheckCompletenessReturnPayload,
  MentorDetailsPayload,
  UpdateMentorProfileRequestSubmitPayload,
} from '~/models/mentorProfiles';

const url = `/mentor-profiles`;

const mentorProfilesApi = {
  checkCompleteness(): Promise<CheckCompletenessReturnPayload | undefined> {
    const urlGet = `${url}/completeness`;
    return axiosClient.get(urlGet);
  },

  requestApproval(idMentorProfiles: number): Promise<any> {
    const urlPut = `${url}/${idMentorProfiles}/request-approval`;
    return axiosClient.put(urlPut);
  },

  updateMentorProfileRequestSubmit(
    data: UpdateMentorProfileRequestSubmitPayload
  ): Promise<any> {
    const urlPut = `${url}/request-approval-skill`;
    return axiosClient.put(urlPut, data);
  },

  getMentorDetails(id: number): Promise<MentorDetailsPayload> {
    const urlGet = `${url}/${id}`;
    return axiosClient.get(urlGet);
  },

  searchMentorProfileUpdateRequest({
    q,
    status,
    page,
    size,
    sort,
  }: UseSearchMentorProfileUpdateRequestPayload): Promise<
    PagingFilterPayload<any>
  > {
    const urlSearch = `${url}/request-approval-skill`;
    return axiosClient.get(`${urlSearch}`);
  },

  processUpdateMentorProfileRequest({
    id,
    skillIds,
    degreeIds,
    status,
    message,
  }: UseMutationProcessUpdateMentorProfileRequestPayload): Promise<any> {
    const data = {
      skillIds,
      degreeIds,
      status,
      message,
    };
    const urlPut = `${url}/${id}/request-approval-skill`;
    return axiosClient.put(urlPut, data);
  },
};

export default mentorProfilesApi;
