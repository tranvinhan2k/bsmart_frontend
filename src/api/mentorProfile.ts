import axiosClient from '~/api/axiosClient';
import { UseMutationProcessUpdateMentorProfileRequestPayload } from '~/hooks/user/useMutationProcessUpdateMentorProfileRequest';
import { UseSearchMentorProfileUpdateRequestPayload } from '~/hooks/user/useSearchMentorProfileUpdateRequest';
import { PagingFilterPayload } from '~/models';
import {
  CheckCompletenessReturnPayload,
  MentorDetailsPayload,
  MentorProfileUpdateDetailsResponse,
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
    q = '',
    status,
    page = 0,
    size = null,
    sort = [],
  }: UseSearchMentorProfileUpdateRequestPayload): Promise<
    PagingFilterPayload<any>
  > {
    const urlSearch = `${url}/edit-profile?q=${q}&status=${status}&page=${page}&size=${size}&sort=${sort}`;
    return axiosClient.get(`${urlSearch}`);
  },
  getMentorProfileUpdateRequestDetails(
    mentorProfileEditId: number
  ): Promise<MentorProfileUpdateDetailsResponse> {
    return axiosClient.get(`${url}/${mentorProfileEditId}/edit-profile-detail`);
  },

  processUpdateMentorProfileRequest({
    id,
    status,
  }: UseMutationProcessUpdateMentorProfileRequestPayload): Promise<any> {
    const data = {
      status,
      message: '',
    };
    const urlPut = `${url}/${id}/approval-edit-profile-detail`;
    return axiosClient.put(urlPut, data);
  },
};

export default mentorProfilesApi;
