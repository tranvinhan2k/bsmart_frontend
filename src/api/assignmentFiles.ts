import { axiosClient } from './axiosClient';

const url = 'assignment-files';

const assignmentFileApi = {
  async deleteFile(ids: number[]) {
    return axiosClient.delete(url, {
      params: {
        ids,
      },
      paramsSerializer: { indexes: null },
    });
    // return generateMockApi(true);
  },
};

export default assignmentFileApi;
