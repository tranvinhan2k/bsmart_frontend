import axiosClient from '~/api/axiosClient';
import { mockImages } from '~/constants';
import { image } from '~/constants/image';
import {
  CreateFeedbackPayload,
  OptionPayload,
  PagingFilterPayload,
  PagingFilterRequest,
} from '~/models';
import {
  GetAllFeedbackTemplate,
  GetAllMentorFeedback,
  GetCourseFeedbackPayload,
  GetFeedbackCommentPayload,
} from '~/models/response';
import {
  ApiParamsProps,
  FeedbackPayload,
  FeedbackReviewPayload,
} from '~/models/type';
import { FeedbackManagerPayload } from '~/pages/FeedbackManagerPage';
import {
  FeedbackMemberQuestionPayload,
  SendFeedbackPayload,
} from '~/pages/member_class/MemberClassInformationPage';
import { MentorFeedbackListPayload } from '~/pages/mentor_class/MentorClassFeedbacksPage';
import { generateMockApi } from '~/utils/common';

const url = `/feedback`;

const feedbacksApi = {
  // get

  async getMentorFeedback({
    id,
    params,
  }: ApiParamsProps): Promise<MentorFeedbackListPayload[]> {
    const response: PagingFilterPayload<GetAllMentorFeedback> =
      await axiosClient.get(`${url}/submission/class/${id}`, {
        params,
      });
    const result: MentorFeedbackListPayload[] = response.items.map((item) => ({
      id: item?.id || 0,
      feedbackAnswers:
        item.questions?.map((subItem, index) => ({
          id: index,
          question: subItem.question,
          answer:
            subItem.answers.find((answer) => answer.isChosen)?.answer || '',
        })) || [],
      name: item.submitBy?.fullName || '',
      point: item.mentorRate || 0,
      report: item.comment || '',
    }));
    // const result: MentorFeedbackListPayload[] = [
    //   {
    //     id: 0,
    //     name: 'Tran Vi Nhan',
    //     point: 3,
    //     report: 'Chắc có mình t thấy ông này code hay',
    //     feedbackAnswers: [
    //       {
    //         id: 0,
    //         question: 'Giáo viên dạy có dễ hiểu không ?',
    //         answer: 'yes',
    //       },
    //       {
    //         id: 1,
    //         question: 'Giáo viên có nhiệt tình hỗ trợ bạn không ?',
    //         answer: 'no',
    //       },
    //       {
    //         id: 2,
    //         question: 'Bạn có cảm thấy hứng thú khi học giáo viên không ?',
    //         answer: 'yes',
    //       },
    //       {
    //         id: 3,
    //         question:
    //           'Kiến thức được giảng dạy đã đủ với những gì bạn muốn học chưa ?',
    //         answer: 'yes',
    //       },
    //       {
    //         id: 4,
    //         question:
    //           'Bạn có cảm thấy giáo viên có hiểu rõ về bài giảng không ?',
    //         answer: 'yes',
    //       },
    //     ],
    //   },
    //   {
    //     id: 1,
    //     name: 'Tran Van A',
    //     point: 5,
    //     report:
    //       'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem   ',
    //     feedbackAnswers: [
    //       {
    //         id: 0,
    //         question: 'Giáo viên dạy có dễ hiểu không ?',
    //         answer: 'yes',
    //       },
    //       {
    //         id: 1,
    //         question: 'Giáo viên có nhiệt tình hỗ trợ bạn không ?',
    //         answer: 'no',
    //       },
    //       {
    //         id: 2,
    //         question: 'Bạn có cảm thấy hứng thú khi học giáo viên không ?',
    //         answer: 'yes',
    //       },
    //       {
    //         id: 3,
    //         question:
    //           'Kiến thức được giảng dạy đã đủ với những gì bạn muốn học chưa ?',
    //         answer: 'yes',
    //       },
    //       {
    //         id: 4,
    //         question:
    //           'Bạn có cảm thấy giáo viên có hiểu rõ về bài giảng không ?',
    //         answer: 'yes',
    //       },
    //     ],
    //   },
    // ];

    return result;
  },
  assignTemplateForClasses({ id, ids }: { id: number; ids: number[] }) {
    return axiosClient.put(`${url}/${id}/classes`, ids);
  },
  async getMemberClassFeedback(id: number) {
    // TODO them api get feedback o day
    // const response = await axiosClient.get(`${url}/feedback/${id}`);
    const result: FeedbackMemberQuestionPayload[] = [
      {
        id: 0,
        question: 'Giáo viên dạy có dễ hiểu không ?',
      },
      {
        id: 1,
        question: 'Giáo viên có nhiệt tình hỗ trợ bạn không ?',
      },
      {
        id: 2,
        question: 'Bạn có cảm thấy hứng thú khi học giáo viên không ?',
      },
      {
        id: 3,
        question:
          'Kiến thức được giảng dạy đã đủ với những gì bạn muốn học chưa ?',
      },
      {
        id: 4,
        question: 'Bạn có cảm thấy giáo viên có hiểu rõ về bài giảng không ?',
      },
    ];

    return generateMockApi(result);
  },

  sendFeedback({ id, params }: { id: number; params: SendFeedbackPayload }) {
    return axiosClient.post(`${url}/${id}/submit`, params);
  },

  async createQuestion(params: CreateFeedbackPayload): Promise<any> {
    const response = await axiosClient.post(`${url}/question`, params);
    return response;
  },
  async getAllQuestion(): Promise<any> {
    const response = await axiosClient.get(`${url}/question`);
    return response;
  },
  async getOptionQuestion(): Promise<any> {
    const response: any = await axiosClient.get(`${url}/question`);
    return response.map(
      (item: any) =>
        ({ id: item.id, label: item.question, value: item.id } as OptionPayload)
    );
  },

  createTemplate(params: CreateFeedbackPayload) {
    return axiosClient.post(`${url}/template`, params);
  },
  async getAllTemplate(
    filterParams: PagingFilterRequest
  ): Promise<PagingFilterPayload<FeedbackManagerPayload>> {
    const response: PagingFilterPayload<GetAllFeedbackTemplate> =
      await axiosClient.get(`${url}/template`, {
        params: filterParams,
      });
    const result: FeedbackManagerPayload[] = response.items.map((item) => ({
      id: item?.id || 0,
      isDefault: !!item.isDefault,
      isFixed: !!item.isFixed,
      name: item.name || '',
      questions: item?.questions || [],
      type: item?.type || 'COURSE',
    }));
    return { ...response, items: result };
  },
  updateTemplate({ id, params }: ApiParamsProps) {
    return axiosClient.put(`${url}/template/${id}`, params);
  },
  async deleteTemplate(id: number) {
    return axiosClient.delete(`${url}/template/${id}`);
  },
  async setDefaultTemplate(id: number) {
    return axiosClient.put(`${url}/default/${id}`);
  },
  async setTemplateForClass({
    templateId,
    classId,
  }: {
    templateId: number;
    classId: number;
  }) {
    return axiosClient.put(`${url}/template/${templateId}/class/${classId}`);
  },
  async getCourseFeedback({ id, params }: ApiParamsProps) {
    const courseResponse: GetCourseFeedbackPayload = await axiosClient.get(
      `${url}/rate/course/${id}`
    );

    const response: PagingFilterPayload<GetFeedbackCommentPayload> =
      await axiosClient.get(`${url}/submissions`, {
        params,
      });

    const valueItems: FeedbackReviewPayload[] = response.items.map(
      (item, index) => ({
        id: index,
        avatarAlt: image.mockStudent,
        avatarUrl: image.mockStudent,
        email: item.submitBy || '',
        feedbackTime: new Date().toISOString(),
        rating: item.rate || 0,
        reviewContent: item.comment || '',
      })
    );

    const result: FeedbackPayload = {
      rating: courseResponse.averageRate || 0,
      rateCount: courseResponse.rateCount,
      numberOfRating: courseResponse.submissionCount || 0,
      items: { ...response, items: valueItems },
    };
    return result;
  },
  async getIntroduceMentorFeedback({ id, params }: ApiParamsProps) {
    const courseResponse: GetCourseFeedbackPayload = await axiosClient.get(
      `${url}/rate/mentor/${id}`
    );

    const response: PagingFilterPayload<GetFeedbackCommentPayload> =
      await axiosClient.get(`${url}/submissions`, {
        params,
      });

    const valueItems: FeedbackReviewPayload[] =
      courseResponse?.submissions?.map((item, index) => ({
        id: index,
        avatarAlt: image.mockStudent,
        avatarUrl: image.mockStudent,
        email: item.submitBy || '',
        feedbackTime: new Date().toISOString(),
        rating: item.rate || 0,
        reviewContent: item.comment || '',
      })) || [];

    const result: FeedbackPayload = {
      rating: courseResponse.averageRate || 0,
      rateCount: courseResponse.rateCount,
      numberOfRating: courseResponse.submissionCount || 0,
      items: { ...response, items: valueItems },
    };
    return result;
  },
};

export default feedbacksApi;
