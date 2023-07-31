import axiosClient from '~/api/axiosClient';
import {
  OptionPayload,
  PagingFilterPayload,
  PagingFilterRequest,
} from '~/models';
import { GetAllFeedbackTemplate } from '~/models/response';
import { QuestionTypeKeys } from '~/models/variables';
import { FeedbackManagerPayload } from '~/pages/FeedbackManagerPage';
import {
  FeedbackMemberQuestionPayload,
  SendFeedbackPayload,
} from '~/pages/member_class/MemberClassInformationPage';
import { MentorFeedbackListPayload } from '~/pages/mentor_class/MentorClassFeedbacksPage';
import { generateMockApi } from '~/utils/common';

export interface FeedbackQuestionPayload {
  id?: number;
  question: string;
  possibleAnswer?: {
    [key: string]: number;
  };
  questionType: QuestionTypeKeys;
}

const url = `/feedbacks`;

const feedbacksApi = {
  // get

  async getMentorFeedback(id: number): Promise<MentorFeedbackListPayload[]> {
    const result: MentorFeedbackListPayload[] = [
      {
        id: 0,
        name: 'Tran Vi Nhan',
        point: 3,
        report: 'Chắc có mình t thấy ông này code hay',
        feedbackAnswers: [
          {
            id: 0,
            question: 'Giáo viên dạy có dễ hiểu không ?',
            answer: 'yes',
          },
          {
            id: 1,
            question: 'Giáo viên có nhiệt tình hỗ trợ bạn không ?',
            answer: 'no',
          },
          {
            id: 2,
            question: 'Bạn có cảm thấy hứng thú khi học giáo viên không ?',
            answer: 'yes',
          },
          {
            id: 3,
            question:
              'Kiến thức được giảng dạy đã đủ với những gì bạn muốn học chưa ?',
            answer: 'yes',
          },
          {
            id: 4,
            question:
              'Bạn có cảm thấy giáo viên có hiểu rõ về bài giảng không ?',
            answer: 'yes',
          },
        ],
      },
      {
        id: 1,
        name: 'Tran Van A',
        point: 5,
        report:
          'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem   ',
        feedbackAnswers: [
          {
            id: 0,
            question: 'Giáo viên dạy có dễ hiểu không ?',
            answer: 'yes',
          },
          {
            id: 1,
            question: 'Giáo viên có nhiệt tình hỗ trợ bạn không ?',
            answer: 'no',
          },
          {
            id: 2,
            question: 'Bạn có cảm thấy hứng thú khi học giáo viên không ?',
            answer: 'yes',
          },
          {
            id: 3,
            question:
              'Kiến thức được giảng dạy đã đủ với những gì bạn muốn học chưa ?',
            answer: 'yes',
          },
          {
            id: 4,
            question:
              'Bạn có cảm thấy giáo viên có hiểu rõ về bài giảng không ?',
            answer: 'yes',
          },
        ],
      },
    ];

    return generateMockApi(result);
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
    return generateMockApi(true);
  },

  async createQuestion(params: FeedbackQuestionPayload): Promise<any> {
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
  async updateQuestion(params: FeedbackQuestionPayload): Promise<any> {
    const response = await axiosClient.put(
      `${url}/question/${params.id}`,
      params
    );
    return response;
  },

  createTemplate(params: FeedbackQuestionPayload) {
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
  updateTemplate(params: FeedbackQuestionPayload) {
    return axiosClient.put(`${url}/template/${params.id}`, params);
  },
  async deleteTemplate(id: number) {
    return axiosClient.delete(`${url}/template/${id}`);
  },
};

export default feedbacksApi;
