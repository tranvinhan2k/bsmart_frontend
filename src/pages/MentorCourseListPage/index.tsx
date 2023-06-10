import { Stack, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import MentorCourseItem from '~/components/molecules/MentorCourseItem';
import { ClassStatusList } from '~/constants';
import { image } from '~/constants/image';
import { useQueryGetAllMentorCourses } from '~/hooks';
import { RequestPagingFilterPayload } from '~/models';
import { scrollToTop } from '~/utils/common';

export default function MentorCourseListPage() {
  const navigate = useNavigate();
  const { control, watch } = useForm({
    defaultValues: {
      filter: ClassStatusList[8],
    },
  });
  const filterWatch = watch('filter');
  const [filterParams, setFilterParams] = useState<RequestPagingFilterPayload>({
    page: 0,
    size: 9,
    sort: undefined,
    status: 'ALL',
  });
  const { courses, refetch } = useQueryGetAllMentorCourses(filterParams);

  const handleChangePageNumber = (e: any, value: number) => {
    setFilterParams({
      ...filterParams,
      page: value - 1,
    });
  };

  const handleNavigateCreateCourse = () => {
    navigate('/mentor-profile/create-course');
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    setFilterParams({
      ...filterParams,
      status: filterWatch?.value as any,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterWatch]);

  return (
    <Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Typography
          sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
        >
          Khoá học đã tạo
        </Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexGrow: 1,
          }}
        >
          <Box sx={{ width: '300px' }}>
            <FormInput
              variant="dropdown"
              name="filter"
              control={control}
              data={ClassStatusList}
            />
          </Box>
          <Stack sx={{ marginLeft: 2 }}>
            <Button
              onClick={handleNavigateCreateCourse}
              customVariant="horizonForm"
            >
              Tạo khóa học
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Grid container>
        {courses &&
          courses?.items?.map((item) => (
            <Grid
              item
              xs={12}
              md={4}
              key={item.id}
              sx={{ alignItems: 'stretch' }}
            >
              <MentorCourseItem
                refetch={refetch}
                onClick={() => {}}
                item={item}
                key={item.id}
              />
            </Grid>
          ))}
      </Grid>
      <Stack
        sx={{ justifyContent: 'center', alignItems: 'center', marginTop: 2 }}
      >
        {courses && courses.items.length === 0 && (
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
            }}
          >
            <Stack
              sx={{
                paddingY: '50px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '300px',
                  height: '300px',
                  objectFit: 'contain',
                }}
                component="img"
                src={image.emptyCourseList}
                alt="no course"
              />
              <Typography
                sx={{
                  fontSize: FontSize.medium_24,
                  fontFamily: FontFamily.regular,
                }}
              >
                Không có khóa học nào.
              </Typography>
            </Stack>
          </Stack>
        )}
        {courses?.items?.length !== 0 && (
          <Pagination
            page={courses?.currentPage}
            onChange={handleChangePageNumber}
            count={courses?.totalPages}
          />
        )}
      </Stack>
    </Stack>
  );
}
