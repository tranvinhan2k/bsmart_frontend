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

  let courseData = null;

  switch (true) {
    case Boolean(error):
      toast.notifyErrorToast(error.message);
      courseData = (
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              color: Color.red,
              fontFamily: FontFamily.light,
            }}
          >
            {error.message}
          </Typography>
        </Stack>
      );

      break;
    case isLoading:
      courseData = (
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          alignContent="space-around"
          alignItems="stretch"
        >
          {Array(24)
            .fill(0)
            .map((_, index) => (
              <Stack
                key={index}
                sx={{
                  marginBottom: MetricSize.medium_15,
                  marginLeft: '15px',
                  borderColor: Color.grey,
                  width: { xs: '100%', md: '31%' },
                  borderRadius: MetricSize.small_5,
                  justifyContent: 'space-between',
                }}
              >
                <Skeleton height={400} />
              </Stack>
            ))}
        </Stack>
      );
      break;
    case data?.items.length === 0:
      courseData = (
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              color: Color.grey,
              fontFamily: FontFamily.light,
            }}
          >
            Không có khóa học phù hợp.
          </Typography>
        </Stack>
      );
      break;
    case isLoading === false:
      courseData = (
        <Grid container>
          {data?.items.map((item, index) => (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <UserCourseItem
                level={item.level}
                key={item.id}
                courseTeacherName={item.courseTeacherName}
                courseDescription={item.courseDescription}
                courseName={item.courseName}
                subjectName={item.subjectName}
                imageAlt={item.imageAlt}
                imageUrl={item.imageUrl}
                onClick={() => handleNavigateCourseDetail(`${item.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      );
      break;
    default:
      break;
  }

  return (
    <Stack sx={{ width: '100%' }}>
      {courseData}
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
