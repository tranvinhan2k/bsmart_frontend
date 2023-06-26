import axiosClient from '~/api/axiosClient';
import { PagingFilterPayload } from '~/models';
import {
  AnnouncementDetailsReturnPayload,
  AnnouncementSearchReturnPayload,
  UseCreateAnnouncementPayload,
  UseGetDetailsAnnouncementPayload,
  UseSearchAnnouncementsPayload,
  UseUpdateAnnouncementPayload,
  UseDeleteAnnouncementPayload,
} from '~/models/announcement';

const url = `/classes`;

const announcementApi = {
  searchAnnouncement({
    idClassSection,
    page = 0,
    size = 0,
    sort = [''],
  }: UseSearchAnnouncementsPayload): Promise<
    PagingFilterPayload<AnnouncementSearchReturnPayload> | undefined
  > {
    const urlGet = `${url}/${idClassSection}/announcements?page=${page}&size=${size}&sort=${sort}`;
    return axiosClient.get(`${urlGet}`);
  },

  getDetailsAnnouncement({
    idClassSection,
    idAnnouncement,
  }: UseGetDetailsAnnouncementPayload): Promise<
    AnnouncementDetailsReturnPayload | undefined
  > {
    const urlGet = `${url}/${idClassSection}/announcements/${idAnnouncement}`;
    return axiosClient.get(`${urlGet}`);
  },

  createAnnouncement({
    idClassSection,
    data,
  }: UseCreateAnnouncementPayload): Promise<any> {
    const urlGet = `${url}/${idClassSection}/announcements`;
    return axiosClient.post(urlGet, data);
  },

  updateAnnouncement({
    idClassSection,
    idAnnouncement,
    data,
  }: UseUpdateAnnouncementPayload): Promise<any> {
    const urlUpdate = `${url}/${idClassSection}/announcements/${idAnnouncement}`;
    return axiosClient.put(urlUpdate, data);
  },

  deleteAnnouncement({
    idClassSection,
    idAnnouncement,
  }: UseDeleteAnnouncementPayload): Promise<any> {
    const urlDelete = `${url}/${idClassSection}/announcements/${idAnnouncement}`;
    return axiosClient.delete(urlDelete);
  },
};

export default announcementApi;
