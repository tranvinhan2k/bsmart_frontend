import { Stack, Typography, Box, Tabs, Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomPagination from '~/components/atoms/CustomPagination';
import MentorCourseItem from '~/components/molecules/MentorCourseItem';
import { CourseStatusList } from '~/constants';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { useQueryGetAllMentorCourses, useTimeOut, useTryCatch } from '~/hooks';
import { RequestPagingFilterPayload } from '~/models';
import { CoursePayload } from '~/models/type';
import { selectProfile } from '~/redux/user/selector';
import globalStyles from '~/styles';
import { scrollToTop } from '~/utils/common';
import toast from '~/utils/toast';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MentorCourseListPage() {
  const navigate = useNavigate();

  const profile = useSelector(selectProfile);

  // useState
  const [filterParams, setFilterParams] = useState<RequestPagingFilterPayload>({
    page: 0,
    size: 9,
    sort: undefined,
    status: 'ALL',
  });
  const [value, setValue] = useState(0);

  const { error, isLoading, handleTryCatch } = useTryCatch();
  const { onSleep } = useTimeOut(1000);

  useEffect(() => {
    handleTryCatch(() => onSleep(1000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = 10;

  const currentPage = 0;

  const courses: CoursePayload[] = [
    {
      id: 0,
      courseCode: 'CODE1',
      courseDescription:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit enim eveniet iste, possimus quidem in error id, placeat culpa quaerat quisquam mollitia natus reprehenderit dolores? Nihil praesentium magnam deserunt autem? ',
      courseName: 'COURSE NAME TEST 1',
      images: [
        {
          id: 0,
          name: 'Hello',
          url: '',
          status: true,
          type: 'AVATAR',
        },
      ],
      mentorName: ['Hello'],
      subjectId: 0,
      subjectName: 'Hello',
      totalClass: 5,
    },
  ];

  // parameters
  const chosenClassStatus = CourseStatusList.find(
    (item) => item.value === filterParams.status
  );

  // functions
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangePageNumber = (e: any, pageNumber: number) => {
    setFilterParams({
      ...filterParams,
      page: pageNumber - 1,
    });
  };
  const handleNavigateCreateCourse = () => {
    if (profile?.mentorProfile?.mentorSkills?.length === 0) {
      toast.notifyErrorToast(
        'Vui lòng cập nhật kĩ năng giáo viên để tạo lớp học mới !'
      );
    } else {
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.create_course}`
      );
    }
  };
  const handleChangeClassStatus = (classStatus: string) => {
    setFilterParams({
      ...filterParams,
      status: classStatus as any,
    });
  };

  // useEffect
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack>
      <Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={globalStyles.textTitle}>Khoá học đã tạo</Typography>

          <Button
            onClick={handleNavigateCreateCourse}
            variant="contained"
            color="secondary"
            sx={{ color: Color.white }}
          >
            Tạo khóa học
          </Button>
        </Stack>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            sx={{
              position: 'relative',
              '.css-1bdosfs-MuiButtonBase-root-MuiTab-root': {
                padding: '0',
                marginRight: MetricSize.medium_15,
              },
            }}
            scrollButtons={false}
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {CourseStatusList.map((item, index) => (
              <Tab
                onClick={() => handleChangeClassStatus(item.value)}
                key={item.id}
                label={item.label}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
      </Stack>
      <Stack sx={{ paddingY: MetricSize.medium_15 }}>
        <Typography
          sx={{
            fontSize: FontSize.medium_28,
            fontFamily: FontFamily.bold,
            color: Color.orange,
          }}
        >
          {chosenClassStatus?.label}
        </Typography>
        <Typography
          sx={{
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.light,
            color: Color.black,
          }}
        >
          {chosenClassStatus?.content}
        </Typography>
      </Stack>

      <Grid container sx={{ width: '100%' }}>
        <LoadingWrapper
          error={error}
          isLoading={isLoading}
          isEmptyCourse={courses.length === 0}
        >
          {courses.map((item: any) => (
            <Grid
              item
              xs={12}
              md={3}
              key={item.id}
              sx={{ alignItems: 'stretch' }}
            >
              <MentorCourseItem item={item} key={item.id} />
            </Grid>
          ))}
        </LoadingWrapper>
      </Grid>
      <Stack
        sx={{ justifyContent: 'center', alignItems: 'center', marginTop: 2 }}
      >
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={handleChangePageNumber}
        />
      </Stack>
    </Stack>
  );
}
