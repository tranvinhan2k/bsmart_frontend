import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import toast from '~/utils/toast';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import CourseItem from '~/components/molecules/CourseItem';
import { CoursePayload } from '~/models/courses';
import { PagingFilterPayload } from '~/models';
import { selectFilterParams } from '~/redux/courses/selector';
import { changeFilterParams } from '~/redux/courses/slice';
import CustomPagination from '~/components/atoms/CustomPagination';
import UserCourseItem from '~/components/molecules/UserCourseItem';

interface CourseMenuSectionProps {
  error: any;
  data: PagingFilterPayload<CoursePayload> | null | undefined;
  isLoading: boolean;
}

export default function CourseMenuSection(props: CourseMenuSectionProps) {
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
          sx={{
            paddingY: MetricSize.medium_15,
          }}
          flexDirection="row"
          flexWrap="wrap"
          alignContent="space-around"
          alignItems="stretch"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <CourseItem isSkeleton key={item} />
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
          {data?.items.map((item) => (
            <Grid key={item.id} item xs={12} md={4} lg={3}>
              <UserCourseItem
                key={item.id}
                courseDescription={item.content}
                courseName={item.title}
                imageAlt="course logo"
                imageUrl={item.images?.[0]?.url}
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
      <Stack
        sx={{ width: '100%' }}
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        {/* <Stack flexDirection="row">
          <Typography
            sx={{
              fontFamily: FontFamily.regular,
              fontSize: FontSize.small_18,
            }}
          >
            {`${data?.items?.length || 0} Khóa học.`}
          </Typography>
        </Stack> */}

        {/* <FormControl size="small">
          <InputLabel id="demo-select-small">Sắp xếp khóa học</InputLabel>
          <Select
            sx={{ width: '200px' }}
            value={dropDownValue}
            label="Sắp xếp khóa học"
            onChange={handleChange}
          >
            <MenuItem value={10}>Khóa học mới nhất</MenuItem>
            <MenuItem value={20}>Khóa học nhiều người học</MenuItem>
            <MenuItem value={30}>Khóa học sắp bắt đầu</MenuItem>
            <MenuItem value={40}>A - Z</MenuItem>
            <MenuItem value={50}>Z - A</MenuItem>
          </Select>
        </FormControl> */}
      </Stack>
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
