import axiosClient from '~/api/axiosClient';
import { ActivityAssignment } from '~/models/activity';

const url = '/activity';

const activityApi = {
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
