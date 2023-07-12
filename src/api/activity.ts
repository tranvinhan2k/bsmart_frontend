import axiosClient from '~/api/axiosClient';
import {
  PostActivityCoursePayload,
  PostActivityRequest,
  PostSubmitActivityRequest,
} from '~/models/request';
import { GetActivityResponse } from '~/models/response';
import { ActivityDetailPayload } from '~/models/type';

const url = '/activity';

const activityApi = {
  // get
  async getActivity(id: number): Promise<ActivityDetailPayload> {
    const response: GetActivityResponse = await axiosClient.get(`${url}/${id}`);
    const result: ActivityDetailPayload = {
      created: response.created || '',
      createdBy: response?.createdBy || '',
      id: response?.id || -1,
      visible: response?.visible || false,
      lastModified: response?.lastModified || '',
      lastModifiedBy: response?.lastModifiedBy || '',
      name: response?.name || '',
      detail: response.detail,
      parentActivityId: response?.parentActivityId || -1,
      type: response?.type || 'SECTION',
    };
    return result;
  },

  // post
  addSectionActivity(params: PostActivityRequest): Promise<boolean> {
    return axiosClient.post(`${url}/section`, params);
  },
  addResourceActivity(params: PostActivityRequest): Promise<boolean> {
    return axiosClient.post(`${url}/resource`, params);
  },
  addQuizActivity(params: PostActivityRequest): Promise<boolean> {
    return axiosClient.post(`${url}/quiz`, params);
  },
  addLessonActivity(params: PostActivityRequest): Promise<boolean> {
    return axiosClient.post(`${url}/lesson`, params);
  },
  addAssignmentActivity(params: PostActivityRequest): Promise<boolean> {
    return axiosClient.post(`${url}/assignment`, params);
  },
  addAnnouncementActivity(params: PostActivityRequest): Promise<boolean> {
    return axiosClient.post(`${url}/announcement`, params);
  },
  submitAssignment({
    id,
    params,
  }: {
    id: number;
    params: PostSubmitActivityRequest;
  }): Promise<boolean> {
    return axiosClient.post(`${url}/assignments/${id}/submit`, params);
  },

  // delete
  deleteContent(id: number): Promise<boolean> {
    return axiosClient.delete(`${url}/${id}`);
  },
  // put
  async updateCourseContent({
    id,
    params,
  }: {
    id: number;
    params: PostActivityCoursePayload;
  }) {
    return axiosClient.put(`${url}/course/${id}`, params);
  },
};

export default activityApi;
