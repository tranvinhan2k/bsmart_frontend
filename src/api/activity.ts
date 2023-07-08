import axiosClient from '~/api/axiosClient';
import { ActivityAssignment } from '~/models/activity';
import { PostActivityCoursePayload } from '~/models/request';
import { ContentPayload } from '~/models/type';

const url = '/activity';

const activityApi = {
  // get
  async getCourseContent(id: number): Promise<ContentPayload> {
    const response = await axiosClient.get(`${url}/${id}`);
    console.log('response', response);
    if (!response.data || response.data === null) return [];
    return (response as any[])?.map((item) => ({
      id: item.id,
      name: item.name,
      modules: (item.lessons as any[]).map((subItem) => ({
        id: subItem.id,
        name: subItem.description,
      })),
    }));
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
    return axiosClient.put(`${url}/${id}`, params);
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
