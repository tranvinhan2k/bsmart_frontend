import axiosClient from '~/api/axiosClient';
import {
  ClassCreateClassSectionPayload,
  ClassDeleteClassSectionPayload,
  ClassDetailsPayload,
  ClassGetDetailsPayload,
  ClassUpdateClassSectionPayload,
} from '~/models/class';
import { PostClassPayload } from '~/models/request';

const url = '/classes';

const classApi = {
  addClassForCourse({ id, param }: { id: number; param: PostClassPayload }) {
    return axiosClient.post(`${url}/course/${id}`, param);
  },

  getClassDetails({
    id,
  }: ClassGetDetailsPayload): Promise<ClassDetailsPayload | undefined> {
    const urlGet = `${url}/${id}`;
    return axiosClient.get(urlGet);
  },
  createClassSections({
    id,
    data,
  }: ClassCreateClassSectionPayload): Promise<any> {
    const urlPost = `${url}/${id}/class-sections`;
    return axiosClient.post(urlPost, data);
  },

  updateClassSections({
    id,
    classSectionId,
    data,
  }: ClassUpdateClassSectionPayload): Promise<any> {
    const urlPut = `${url}/${id}/class-sections/${classSectionId}`;
    return axiosClient.put(urlPut, data);
  },

  deleteClassSections({
    id,
    classSectionId,
  }: ClassDeleteClassSectionPayload): Promise<any> {
    const urlDelete = `${url}/${id}/class-sections/${classSectionId}`;
    return axiosClient.delete(urlDelete);
  },

  async getMentorClassAttendances({
    id,
  }: ClassGetDetailsPayload): Promise<any> {
    const urlGet = `${url}/${id}/time-tables`;
    const response: any = await axiosClient.get(urlGet, {
      params: {
        id,
      },
    });
    return response;
  },
};

export default classApi;
