import axiosClient from '~/api/axiosClient';
import { ClassCreateAnnouncementPayload } from '~/models/class';

const url = `/classes`;

export interface CreateAnnouncementPayload {
  content: string;
  title: string;
  visible: boolean;
}

const announcementApi = {
  createAnnouncement({
    id,
    data,
  }: ClassCreateAnnouncementPayload): Promise<any> {
    const urlGet = `${url}/${id}/announcements`;
    return axiosClient.post(urlGet, data);
  },
};

export default announcementApi;
