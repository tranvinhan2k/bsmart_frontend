import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import coursesApi, {
  handleResponseGetCourse,
  RequestGetCoursePayload,
  ResponseGetCoursePayload,
} from '~/api/courses';
import { MetricSize } from '~/assets/variables';
import CourseFilterSection from '~/containers/CoursesSection/CourseFilterSection';
import CourseMenuSection from '~/containers/CoursesSection/CourseMenuSection';
import { PagingFilterPayload } from '~/models';
import { scrollToTop } from '~/utils/common';

// TODO: add filter params
export default function CoursesPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

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

  console.log(filterParams);

  const handleFilterParams = (filter: RequestGetCoursePayload) => {
    console.log(filter);

    setFilterParams(filter);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => coursesApi.getAllCourse(filterParams),
  });

  return (
    <Grid
      container
      sx={{
        flexDirection: 'row',
        paddingTop: MetricSize.large_20,
        paddingX: { xs: 0, md: '95px' },
      }}
    >
      <Grid item xs={12} md={3}>
        <CourseFilterSection
          filter={filterParams}
          onFilter={handleFilterParams}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <CourseMenuSection
          error={error}
          data={handleResponseGetCourse(data)}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
}
