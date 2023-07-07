import axiosClient from '~/api/axiosClient';
import { ActivityAssignment } from '~/models/activity';
import { PostActivityCoursePayload } from '~/models/request';

const url = '/activity';

const activityApi = {
  getActivityDetails({
    id,
  }: ViewActivityProps): Promise<ActivityAssignment | undefined> {
    const urlGet = `${url}/${id}`;
    return axiosClient.get(urlGet);
  },
  addActivityCourse({
    id,
    param,
  }: {
    id: number;
    param: PostActivityCoursePayload;
  }): Promise<any> {
    console.log(param);

    return axiosClient.post(`${url}/course/${id}`, param);
  },
};

interface ViewActivityProps {
  id?: number;
}

export default activityApi;
