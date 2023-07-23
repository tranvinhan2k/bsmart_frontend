import { PagingFilterRequest, PostQuizQuestionPayload } from '~/models';
import { axiosClient } from './axiosClient';

const url = 'question';

const questionApi = {
  // get
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
