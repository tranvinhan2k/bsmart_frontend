import { Stack, Typography, Box, Tabs, Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomPagination from '~/components/atoms/CustomPagination';
import MentorCourseItem from '~/components/molecules/MentorCourseItem';
import { CourseStatusList } from '~/constants';
import { image } from '~/constants/image';
import { useQueryGetAllMentorCourses } from '~/hooks';
import { RequestPagingFilterPayload } from '~/models';
import globalStyles from '~/styles';
import { scrollToTop } from '~/utils/common';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MentorCourseListPage() {
  const navigate = useNavigate();

  // useState
  const [filterParams, setFilterParams] = useState<RequestPagingFilterPayload>({
    page: 0,
    size: 9,
    sort: undefined,
    status: 'ALL',
  });
  const [value, setValue] = useState(0);

  const { courses, refetch } = useQueryGetAllMentorCourses(filterParams);

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
    navigate('/mentor-profile/create-course');
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

  console.log('totalPage', courses?.totalPages, courses?.currentPage);

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
            customVariant="horizonForm"
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
      {/* <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
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
        </Stack>
      </Stack> */}
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
        <CustomPagination
          currentPage={courses?.currentPage}
          totalPages={courses?.totalPages}
          onChange={handleChangePageNumber}
        />
      </Stack>
    </Stack>
  );
}
