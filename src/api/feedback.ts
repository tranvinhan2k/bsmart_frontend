import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';
import { QuestionTypeKeys } from '~/models/variables';
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
  async deleteQuestion(id: number): Promise<any> {
    const response = await axiosClient.delete(`${url}/question/${id}`);
    return response;
  },

  async createTemplate(params: FeedbackQuestionPayload): Promise<any> {
    const response = await axiosClient.post(`${url}/template`, params);
    return response;
  },
  async getAllTemplate(): Promise<any> {
    const response = await axiosClient.get(`${url}/template`);
    return response;
  },
  async updateTemplate(params: FeedbackQuestionPayload): Promise<any> {
    const response = await axiosClient.put(
      `${url}/template/${params.id}`,
      params
    );
    return response;
  },
  async deleteTemplate(id: number): Promise<any> {
    const response = await axiosClient.delete(`${url}/template/${id}`);
    return response;
  },
};

export default feedbacksApi;
