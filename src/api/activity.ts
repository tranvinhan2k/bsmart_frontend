import axiosClient from '~/api/axiosClient';
import {
  PostActivityCoursePayload,
  PostActivityRequest,
  PostAssignmentRequest,
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
      authorizeClasses: response?.authorizeClasses || [],
      description: response?.description || '',
    };
    return result;
  },

  // post
  addSectionActivity(params: PostActivityRequest): Promise<boolean> {
    return axiosClient.post(`${url}/section`, params);
  },
  addResourceActivity(params: PostActivityRequest): Promise<boolean> {
    const requestData = new FormData();
    requestData.append('name', params.name);
    requestData.append('visible', String(params.visible));
    requestData.append('parentActivityId', String(params.parentActivityId));
    requestData.append('courseId', String(params.courseId));

    if (!(params.authorizeClasses?.length > 0)) {
      requestData.append('authorizeClasses', String(-1));
    } else {
      params.authorizeClasses.map((item) => {
        requestData.append('authorizeClasses', String(item));
        return null;
      });
    }

    if (params.file) {
      requestData.append('file', params.file);
    }

    return axiosClient.post(`${url}/resource`, requestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  addQuizActivity(params: PostAssignmentRequest): Promise<boolean> {
    const requestData = new FormData();
    requestData.append('name', params.name);
    requestData.append('visible', String(params.visible));
    requestData.append('parentActivityId', String(params.parentActivityId));
    requestData.append('courseId', String(params.courseId));
    requestData.append('description', String(params.description));
    requestData.append('startDate', String(params.startDate));
    requestData.append('endDate', String(params.endDate));
    requestData.append('editBeForSubmitMin', String(params.editBeForSubmitMin));
    requestData.append('maxFileSubmit', String(params.maxFileSubmit));
    requestData.append('maxFileSize', String(params.maxFileSize));
    requestData.append(
      'isOverWriteAttachFile',
      String(params.isOverWriteAttachFile)
    );
    requestData.append('passPoint', String(params.passPoint));
    requestData.append(
      'overWriteAttachFile',
      String(params.overWriteAttachFile)
    );

    if (!(params.authorizeClasses?.length > 0)) {
      requestData.append('authorizeClasses', String(-1));
    } else {
      params.authorizeClasses.map((item) => {
        requestData.append('authorizeClasses', String(item));
        return null;
      });
    }

    if (params.attachFiles) {
      params.attachFiles.map((item) => {
        requestData.append('file', item);
        return null;
      });
    }

    return axiosClient.post(`${url}/quiz`, requestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
  async updateSection({
    id,
    params,
  }: {
    id: number;
    params: PostActivityRequest;
  }) {
    return axiosClient.put(`${url}/${id}/section`, params);
  },
  async updateLesson({
    id,
    params,
  }: {
    id: number;
    params: PostActivityRequest;
  }) {
    return axiosClient.put(`${url}/${id}/lesson`, params);
  },
};

export default activityApi;
