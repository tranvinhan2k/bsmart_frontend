import axiosClient from '~/api/axiosClient';
import { CourseCreateRequestDetails } from '~/models/courses';
import { PagingFilterPayload } from '~/models';
import { UseSearchCourseCreateRequestPayload } from '~/hooks/course/useSearchCourseCreateRequest';
import { ProcessCreateCourseRequestPayload } from './courses';

const url = '/courses';

const courseCreateRequestApi = {
  searchCourseCreateRequest({
    status,
    q = '',
    page = 0,
    size = null,
    sort = [],
  }: UseSearchCourseCreateRequestPayload): Promise<
    PagingFilterPayload<CourseCreateRequestDetails>
  > {
    const urlSearch = `${url}/pending?status=${status}&p=${q}&page=${page}&size=${size}&sort=${sort}`;
    return axiosClient.get(`${urlSearch}`);
  },
  processCourseCreateRequest(
    data: ProcessCreateCourseRequestPayload
  ): Promise<boolean> {
    return axiosClient.put(`${url}/${data.id}/approval`, {
      classIds: data.classIds,
      status: data.status,
      message: data.message,
    });
  },
};

export default courseCreateRequestApi;
