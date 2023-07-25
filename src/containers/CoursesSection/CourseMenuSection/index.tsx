import { useNavigate } from 'react-router-dom';
import { Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import toast from '~/utils/toast';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { PagingFilterPayload } from '~/models';
import { selectFilterParams } from '~/redux/courses/selector';
import { changeFilterParams } from '~/redux/courses/slice';
import CustomPagination from '~/components/atoms/CustomPagination';
import UserCourseItem from '~/components/molecules/items/UserCourseItem';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import { CourseMenuItemPayload } from '~/models/type';
import { LoadingWrapper } from '~/HOCs';

interface CourseMenuSectionPayload {
  error: any;
  data: PagingFilterPayload<CourseMenuItemPayload> | null | undefined;
  isLoading: boolean;
}

export default function CourseMenuSection(props: CourseMenuSectionPayload) {
  const { data, error, isLoading } = props;
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const filterParams = useSelector(selectFilterParams);

  const handleNavigateCourseDetail = (id: string) => {
    navigation(`course-detail/${id}`);
  };

  const handlePagination = (e: any, v: any) => {
    dispatch(changeFilterParams({ ...filterParams, page: v - 1 }));
  };

  return (
    <Stack sx={{ width: '100%' }}>
      <LoadingWrapper error={error} isLoading={isLoading}>
        <Grid container>
          {data?.items.map((item, index) => (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <UserCourseItem
                level={item.level}
                key={item.id}
                courseCode={item.courseCode}
                courseTeacherName={item.courseTeacherName}
                courseDescription={item.courseDescription || ''}
                courseName={item.courseName}
                subjectName={item.subjectName}
                imageAlt={item.imageAlt}
                totalClass={item.totalClass}
                imageUrl={item.imageUrl}
                onClick={() => handleNavigateCourseDetail(`${item.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </LoadingWrapper>
      {data && data.items.length > 0 && (
        <Stack justifyContent="center" alignItems="center" padding={2}>
          <CustomPagination
            currentPage={data?.currentPage}
            onChange={handlePagination}
            totalPages={data?.totalPages}
          />
        </Stack>
      )}
    </Stack>
  );
}
