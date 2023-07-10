import axiosClient from '~/api/axiosClient';
import { ActivityAssignment } from '~/models/activity';
import { PostActivityCoursePayload } from '~/models/request';
import { ContentPayload } from '~/models/type';
import { formatToLocalContent } from '~/utils/common';

const url = '/activity';

const activityApi = {
  // get
  async getCourseContent(id: number): Promise<ContentPayload> {
    const response = await axiosClient.get(`${url}/course/${id}`);
    return (
      (response as any[])?.map((item) => {
        return formatToLocalContent(item);
      }) || null
    );
  },
  // post
  addCourseContent({
    id,
    params,
  }: {
    id: number;
    params: PostActivityCoursePayload;
  }): Promise<any> {
    return axiosClient.post(`${url}/course/${id}`, params);
  },
  // delete
  deleteCourseContent(id: number) {
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

  getActivityDetails({
    id,
  }: ViewActivityProps): Promise<ActivityAssignment | undefined> {
    const urlGet = `${url}/${id}`;
    return axiosClient.get(urlGet);
  },
};

interface ViewActivityProps {
  id?: number;
}

export default activityApi;
