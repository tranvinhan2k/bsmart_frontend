import axiosClient from '~/api/axiosClient';
import { PagingFilterPayload } from '~/models';
import {
  PagingFilterRequest,
  PostActivityRequest,
  PostAssignmentRequest,
  PostSubmitActivityRequest,
  PostSubmitQuizPayload,
} from '~/models/request';
import {
  AssignmentResultResponse,
  GetActivityResponse,
  GetAllMentorAssignment,
  GetMentorListQuiz,
  GetMentorQuizzesResponse,
  GetReviewQuizResponse,
  PostDoQuizResponse,
} from '~/models/response';
import {
  ActivityDetailPayload,
  QuizReportStudentPayload,
  QuizReportTeacherPayload,
} from '~/models/type';
import { DoQuizPayload } from '~/pages/QuizPage';
import {
  AssignmentItemPayload,
  AssignmentSubmitItemPayload,
} from '~/pages/mentor_class/MentorClassAssignmentPage';
import { generateMockApi } from '~/utils/common';

const url = '/activity';

const activityApi = {
  // get
  async getActivity(id: number): Promise<ActivityDetailPayload> {
    const response: GetActivityResponse = await axiosClient.get(`${url}/${id}`);
    const result: ActivityDetailPayload = {
      created: response?.created || '',
      createdBy: response?.createdBy || '',
      id: response?.id || -1,
      visible: response?.visible || false,
      lastModified: response?.lastModified || '',
      lastModifiedBy: response?.lastModifiedBy || '',
      name: response?.name || '',
      parentActivityId: response?.parentActivityId || -1,
      type: response?.type || 'LESSON',
      authorizeClasses: response?.authorizeClasses || [],
      detail: response?.detail,
      isFixed: false,
    };
    switch (result.type) {
      case 'LESSON':
        result.detail = {
          description: response?.detail?.description || '',
        };
        break;
      case 'ASSIGNMENT':
        result.detail = {
          note: response?.detail.note || '',
          assignmentId: response?.detail.id || 0,
          description: response?.detail.description || '',
          attachFiles: response?.detail?.assignmentFiles,
          editBeForSubmitMin: response?.detail?.editBeForSubmitMin,
          maxFileSize: response?.detail?.maxFileSize,
          maxFileSubmit: response?.detail?.maxFileSubmit,
          passPoint: response?.detail?.passPoint,
        };
        break;
      case 'RESOURCE':
        result.detail = {
          file: {
            name: response?.detail?.metadata.name,
            url: response?.detail?.metadata.url,
            size: response.detail.metadata.size,
          },
        };
        break;
      case 'QUIZ':
        result.detail = {
          id: response.detail.id || 0,
          questionCount: response.detail.questionCount || '',
          status: response.detail.status || '',
          code: response?.detail?.code,
          allowReviewAfterMin: response?.detail?.allowReviewAfterMin,
          defaultPoint: response?.detail?.defaultPoint,
          isAllowReview: response?.detail?.isAllowReview,
          isSuffleQuestion: response?.detail?.isSuffleQuestion,
          password: response?.detail?.password,
          time: response?.detail?.time,
          quizQuestions: response?.detail?.quizQuestions.map((item: any) => ({
            id: item.id || 0,
            question: item.question || '',
            questionType: item.type || '',
            answers:
              item.answers.map((answer: any) => ({
                answer: answer.answer,
                right: answer.right,
              })) || [],
          })),
        };
        break;
      default:
        break;
    }
    return result;
  },

  async getResultQuiz(id: number) {
    const response: GetMentorQuizzesResponse[] = await axiosClient.get(
      `${url}/quiz/${id}/result/student`
    );

    const result: QuizReportStudentPayload[] = response.map((item) => ({
      id: item.id || 0,
      name: item?.submitBy?.name || '',
      correctNumber: item?.correctNumber || 0,
      point: item?.point || 0,
      submitAt: item?.submitAt || '',
      totalQuestion: item?.totalQuestion || 0,
    }));

    return result;
  },

  async getResultAssignment(params: { classId: number; assignmentId: number }) {
    const response: AssignmentResultResponse = await axiosClient.get(
      `${url}/assignments/${params.assignmentId}/submit`,
      { params }
    );

    return response;
  },

  async getMentorQuizzes({
    id,
    params,
  }: {
    id: number;
    params: PagingFilterRequest;
  }): Promise<PagingFilterPayload<QuizReportStudentPayload>> {
    const response: PagingFilterPayload<GetMentorQuizzesResponse> =
      await axiosClient.get(`${url}/quiz/${id}/result/teacher`, {
        params,
      });
    const result: QuizReportStudentPayload[] = response.items.map((item) => ({
      id: 0,
      name: item?.submitBy?.name || '',
      correctNumber: item?.correctNumber || 0,
      point: item?.point || 0,
      submitAt: item?.submitAt || '',
      totalQuestion: item?.totalQuestion || 0,
    }));
    return { ...response, items: result };
  },

  async getReviewQuiz(id: number) {
    const response: GetReviewQuizResponse = await axiosClient.get(
      `${url}/quiz/review/${id}`
    );
    const result: DoQuizPayload = {
      name: '',
      time: 123,
      questions:
        response.questions?.map((item) => ({
          id: item.id || 0,
          questionContent: item?.question || '',
          isMultipleAnswer: item?.type === 'MULTIPLE',
          answers:
            item?.answers?.map((subItem) => ({
              id: subItem?.id || 0,
              value: subItem?.answer || '',
              isChosen: !!subItem?.isChosen,
              isRight: !!subItem?.isRight,
            })) || [],
        })) || [],
    };

    return result;
  },

  async getMentorAssignments({
    id,
    params,
  }: {
    id: number;
    params: PagingFilterRequest;
  }): Promise<AssignmentItemPayload[]> {
    const response: PagingFilterPayload<GetAllMentorAssignment> =
      await axiosClient.get(`${url}/assignments/${id}/submits`, {
        params,
        paramsSerializer: { indexes: null },
      });
    const rows: AssignmentItemPayload[] = response.items.map((item) => ({
      id: item.id || 0,
      file: item.assignmentFiles as Blob[],
      studentId: item.studentClass?.id || 0,
      studentName: item.studentClass?.name || '',
      timeSubmit: item.lastModified || '',
    }));
    return generateMockApi(rows);
  },

  async getMentorListQuiz({
    id,
    params,
  }: {
    id: number;
    params: PagingFilterRequest;
  }) {
    const response: PagingFilterPayload<GetMentorListQuiz> =
      await axiosClient.get(`${url}/quiz/${id}/result/teacher`, {
        params,
      });
    const result: QuizReportTeacherPayload[] = response.items.map((item) => ({
      id: item.id || 0,
      correctNumber: item.correctNumber || 0,
      name: item.submitBy?.name || '',
      point: item.point || 0,
      submitAt: item.submitAt || '',
      totalQuestion: item.totalQuestion || 0,
      userId: item.submitBy?.id || 0,
    }));

    return { ...response, items: result };
  },

  async addPointAssignment({
    id,
    params,
  }: {
    id: number;
    params: AssignmentSubmitItemPayload[];
  }) {
    return axiosClient.put(`${url}/assignments/${id}/grading`, params);
  },

  // post
  async postDoQuiz({
    id,
    password,
  }: {
    id: number;
    password: string;
  }): Promise<DoQuizPayload> {
    const response: PostDoQuizResponse = await axiosClient.post(
      `${url}/${id}/quiz/attempt`,
      {
        password,
      }
    );

    const result: DoQuizPayload = {
      name: response?.code || '',
      time: response?.time || 0,
      questions:
        response?.quizQuestions?.map((item) => ({
          id: item?.id || 0,
          isMultipleAnswer: item?.type === 'MULTIPLE',
          questionContent: item?.question || '',
          answers:
            item?.answers?.map((subItem) => ({
              id: subItem?.id || 0,
              value: subItem?.answer || '',
              isChosen: false,
              isRight: false,
            })) || [],
        })) || [],
    };

    return result;
  },

  async postSubmitQuiz({
    id,
    params,
  }: {
    id: number;
    params: PostSubmitQuizPayload;
  }): Promise<DoQuizPayload> {
    return axiosClient.post(`${url}/${id}/quiz/submit`, params);
  },

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
    const requestData = new FormData();
    requestData.append('note', params.note);
    requestData.append('password', params.password);

    if (params.submittedFiles) {
      params.submittedFiles.map((item) => {
        requestData.append('submittedFiles', item);
        return null;
      });
    }
    return axiosClient.post(`${url}/assignments/${id}/submit`, requestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // delete
  deleteContent(id: number): Promise<boolean> {
    return axiosClient.delete(`${url}/${id}`);
  },
  // put
  async submitForReviewSection({
    id,
    params,
  }: {
    id: number;
    params: PostActivityRequest;
  }) {
    return generateMockApi(true);
  },
  async submitForReviewLesson({
    id,
    params,
  }: {
    id: number;
    params: PostActivityRequest;
  }) {
    return generateMockApi(true);
    // return axiosClient.put(`${url}/${id}/lesson`, params);
  },
  async submitForReviewResource({
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

    return generateMockApi(true);
    // return axiosClient.put(`${url}/${id}/resource`, requestData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
  },
  async submitForReviewAssignment({
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

    // return axiosClient.put(`${url}/${id}/assignment`, requestData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    return generateMockApi(true);
  },
  async submitForReviewQuiz({
    id,
    params,
  }: {
    id: number;
    params: PostActivityRequest;
  }) {
    // return axiosClient.put(`${url}/${id}/quiz`, params);
    return generateMockApi(true);
  },

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
