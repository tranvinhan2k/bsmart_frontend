import { Stack, Typography, Box, Tabs, Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomPagination from '~/components/atoms/CustomPagination';
import MentorClassItem from '~/components/molecules/MentorClassItem';
import { ClassStatusList } from '~/constants';
import { image } from '~/constants/image';
import { useQueryGetAllMentorClasses } from '~/hooks/useQueryGetAllMentorClasses';
import { RequestPagingFilterPayload } from '~/models';
import globalStyles from '~/styles';
import { scrollToTop } from '~/utils/common';

const TEXTS = {
  title_1: 'Lớp học đã tạo',
  button_title_1: 'Tạo khóa học',
  title_2: 'Không có lớp học nào.',
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MentorClassListPage() {
  const navigate = useNavigate();

  // useState
  const [filterParams, setFilterParams] = useState<RequestPagingFilterPayload>({
    page: 0,
    size: 9,
    sort: undefined,
    status: 'ALL',
  });
  const [value, setValue] = useState(0);

  const { classes, refetch } = useQueryGetAllMentorClasses(filterParams);

  // parameters
  const chosenClassStatus = ClassStatusList.find(
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
          <Typography sx={globalStyles.textTitle}>{TEXTS.title_1}</Typography>
          <Button
            onClick={handleNavigateCreateCourse}
            customVariant="horizonForm"
          >
            {TEXTS.button_title_1}
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
            {ClassStatusList.map((item, index) => (
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
            color: Color.tertiary,
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
        {classes &&
          classes?.items?.map((item: any) => (
            <Grid
              item
              xs={12}
              md={4}
              key={item.id}
              sx={{ alignItems: 'stretch' }}
            >
              <MentorClassItem
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
        {classes && classes.items.length === 0 && (
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
                {TEXTS.title_2}
              </Typography>
            </Stack>
          </Stack>
        )}
        <CustomPagination
          currentPage={classes?.currentPage}
          totalPages={classes?.totalPages}
          onChange={handleChangePageNumber}
        />
      </Stack>
    </Stack>
  );
}
