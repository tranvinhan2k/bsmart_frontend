import { PagingFilterRequest, PostQuizQuestionPayload } from '~/models';
import { axiosClient } from './axiosClient';
import { QuizQuestionPayload } from '~/components/atoms/FormInput/QuizInput';
import { GetQuizQuestionResponse } from '~/models/response';
import { generateMockApi } from '~/utils/common';

const url = 'question';

const questionApi = {
  // get
  async getAllBanksQuizQuestionForQuizInput() {
    // TODO them ngan hang cau hoi neu be xong
    const bankQuestions: QuizQuestionPayload[] = [
      {
        id: 0,
        question: '1 + 1 = 2 ?',
        questionType: 'SINGLE',
        answers: [
          {
            answer: 'yes',
            right: true,
          },
          {
            answer: 'no',
            right: false,
          },
        ],
      },
      {
        id: 1,
        question: '1 + 1 = 3 ?',
        questionType: 'SINGLE',
        answers: [
          {
            answer: 'yes',
            right: true,
          },
          {
            answer: 'no',
            right: false,
          },
        ],
      },
    ];

    return generateMockApi(bankQuestions);
  },
  async getAllQuizQuestion(params: PagingFilterRequest): Promise<any> {
    const response = await axiosClient.get(`${url}/filters`, {
      params,
      paramsSerializer: { indexes: null },
    });
    // TODO: format this quiz question

    return response;
  },
  async getQuizQuestion(id: number) {
    const response = await axiosClient.get(`${url}/${id}`);
    // TODO: format this quiz question

    return response;
  },

  async readExcelFile(file: Blob) {
    const requestData = new FormData();
    requestData.append('file', file);

    const response: GetQuizQuestionResponse[] = await axiosClient.post(
      `${url}/read-file`,
      requestData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const result: QuizQuestionPayload[] = response.map((item) => ({
      id: item.id || 0,
      question: item.question || '',
      questionType: item.questionType || 'SINGLE',
      answers:
        item.answers?.map((answer) => ({
          answer: answer.answer,
          right: answer.isRight,
        })) || [],
    }));

    console.log(response, result);

    return result;
  },

  // post
  async addQuizQuestion(params: PostQuizQuestionPayload) {
    return axiosClient.post(url, params);
  },

  // put
  async updateQuizQuestion({
    id,
    params,
  }: {
    id: number;
    params: PostQuizQuestionPayload;
  }) {
    return axiosClient.put(`${url}/${id}`, params);
  },

  // delete
  async deleteQuizQuestion(id: number) {
    return axiosClient.delete(`${url}/${id}`);
  },
};

export default questionApi;
