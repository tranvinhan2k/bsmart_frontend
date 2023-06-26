export interface AnnouncementSearchReturnPayload {
  id: number;
  title: string;
  visible: boolean;
}
export interface AnnouncementDetailsReturnPayload {
  id: number;
  title: string;
  content: string;
  visible: boolean;
}

export interface UseSearchAnnouncementsPayload {
  idClassSection: number;
  page?: number;
  size?: number;
  sort?: string[];
}
export interface UseGetDetailsAnnouncementPayload {
  idClassSection: number;
  idAnnouncement: number;
}
export interface UseCreateAnnouncementPayload {
  idClassSection: number;
  data: {
    title: string;
    content: string;
    visible: boolean;
  };
}
export interface UseDeleteAnnouncementPayload {
  idClassSection: number;
  idAnnouncement: number;
}
export interface UseUpdateAnnouncementPayload {
  idClassSection: number;
  idAnnouncement: number;
  data: {
    title: string;
    content: string;
    visible: boolean;
  };
}
