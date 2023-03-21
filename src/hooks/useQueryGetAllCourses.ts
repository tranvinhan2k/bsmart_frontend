import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import categoriesApi from '~/api/categories';
import coursesApi, { RequestGetCoursePayload } from '~/api/courses';

export const useQueryGetAllCourse = () => {
  const [filterParams, setFilterParams] = useState<RequestGetCoursePayload>({
    q: undefined,
    categoryId: undefined,
    subjectId: undefined,
    page: 0,
    size: 9,
    sort: undefined,
    provinces: undefined,
    types: undefined,
  });
  const { error, data, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => coursesApi.getAllCourse(filterParams),
  });

  const handleChangeFilterParams = (filter: RequestGetCoursePayload) => {
    setFilterParams(filter);
  };

  return {
    error,
    courses: data,
    isLoading,
    filterParams,
    handleChangeFilterParams,
  };
};
