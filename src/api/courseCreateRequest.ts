import axiosClient from '~/api/axiosClient';
import { CourseCreateRequestDetails } from '~/models/courses';
import { PagingFilterPayload } from '~/models';
import { ProcessCreateCourseRequestPayload } from './courses';

const url = '/courses';

const courseCreateRequestApi = {
  searchCourseCreateRequest({
    status,
    q = '',
    page = 0,
    size = null,
    sort = [],
  }: SearchCourseCreateRequestProps): Promise<
    PagingFilterPayload<CourseCreateRequestDetails>
  > {
    const urlSearch = `${url}/pending?status=${status}&p=${q}&page=${page}&size=${size}&sort=${sort}`;
    return axiosClient.get(`${urlSearch}`);
  },
  approveCourseCreateRequest(
    data: ProcessCreateCourseRequestPayload
  ): Promise<boolean> {
    return axiosClient.put(`${url}/${data.id}/approval`, {
      classIds: data.classIds,
      status: data.status,
      message: data.message,
    });
  },
};

interface SearchCourseCreateRequestProps {
  status: string;
  q?: string | null;
  page?: number;
  size?: number | null;
  sort?: string[];
}

export default courseCreateRequestApi;
