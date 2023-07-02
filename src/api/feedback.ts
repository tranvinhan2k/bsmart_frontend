import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';
import { QuestionTypeKeys } from '~/models/variables';

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
