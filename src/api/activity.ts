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
      detail: {
        ...response.detail,
        type: response.type,
      },
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
  addQuizActivity(params: PostActivityRequest): Promise<boolean> {
    return axiosClient.post(`${url}/quiz`, params);
  },
  addLessonActivity(params: PostActivityRequest): Promise<boolean> {
    return axiosClient.post(`${url}/lesson`, params);
  },
  addAssignmentActivity(params: PostAssignmentRequest): Promise<boolean> {
    const requestData = new FormData();
    requestData.append('name', params.name);
    requestData.append('visible', String(params.visible));
    requestData.append('parentActivityId', String(params.parentActivityId));
    requestData.append('courseId', String(params.courseId));
    requestData.append('description', String(params.description));
    requestData.append('startDate', params.startDate);
    requestData.append('endDate', params.endDate);
    requestData.append('editBeForSubmitMin', String(params.editBeForSubmitMin));
    requestData.append('maxFileSubmit', String(params.maxFileSubmit));
    requestData.append('maxFileSize', String(params.maxFileSize));
    requestData.append(
      'isOverWriteAttachFile',
      String(params.isOverWriteAttachFile)
    );
    requestData.append('passPoint', String(params.passPoint));

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
        requestData.append('attachFiles', item);
        return null;
      });
    }

    return axiosClient.post(`${url}/assignment`, requestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
  async updateResource({
    id,
    params,
  }: {
    id: number;
    params: PostActivityRequest;
  }) {
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
      const blob = await fetch((params?.file as any)?.url).then((r) =>
        r.blob().then(
          (blobFile) =>
            new File([blobFile], (params.file as any).name, {
              type: 'ACTACH',
            })
        )
      );

      requestData.append('file', blob);
    }

    return axiosClient.put(`${url}/${id}/resource`, requestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  async updateAssignment({
    id,
    params,
  }: {
    id: number;
    params: PostAssignmentRequest;
  }) {
    const requestData = new FormData();
    requestData.append('name', params.name);
    requestData.append('visible', String(params.visible));
    requestData.append('parentActivityId', String(params.parentActivityId));
    requestData.append('courseId', String(params.courseId));
    requestData.append('description', String(params.description));
    requestData.append('startDate', params.startDate);
    requestData.append('endDate', params.endDate);
    requestData.append('editBeForSubmitMin', String(params.editBeForSubmitMin));
    requestData.append('maxFileSubmit', String(params.maxFileSubmit));
    requestData.append('maxFileSize', String(params.maxFileSize));
    requestData.append(
      'isOverWriteAttachFile',
      String(!!params.isOverWriteAttachFile)
    );
    requestData.append('passPoint', String(params.passPoint));

    if (!(params.authorizeClasses?.length > 0)) {
      requestData.append('authorizeClasses', String(-1));
    } else {
      params.authorizeClasses.map((item) => {
        requestData.append('authorizeClasses', String(item));
        return null;
      });
    }

    if (params.attachFiles) {
      await Promise.all(
        params.attachFiles.map(async (item) => {
          const blob = await fetch((item as any)?.url).then((r) =>
            r.blob().then(
              (blobFile) =>
                new File([blobFile], (item as any).name, {
                  type: 'ACTTACH',
                })
            )
          );
          requestData.append('attachFiles', blob);
          return null;
        })
      );
    }

    return axiosClient.put(`${url}/${id}/assignment`, requestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  async updateQuiz({
    id,
    params,
  }: {
    id: number;
    params: PostActivityRequest;
  }) {
    return axiosClient.put(`${url}/${id}/quiz`, params);
  },
};

export default activityApi;
