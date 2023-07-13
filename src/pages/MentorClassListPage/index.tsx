import { Stack, Typography, Box, Tabs, Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomPagination from '~/components/atoms/CustomPagination';
import { SearchTextField } from '~/components/atoms/textField/SearchTextField';
import MentorClassItem from '~/components/molecules/MentorClassItem';
import { ClassStatusList } from '~/constants';
import { image } from '~/constants/image';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { PagingFilterRequest } from '~/models';
import { ClassMenuItemPayload } from '~/models/type';
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

  const classes: ClassMenuItemPayload[] = [
    {
      id: 0,
      imageAlt: '',
      imageUrl: image.mockCourse,
      name: 'Lớp Kiểm Thử',
      progressValue: 50,
      status: '',
      teacherName: ['Trần Vĩ Nhân'],
    },
    {
      id: 1,
      imageAlt: '',
      imageUrl: image.mockCourse,
      name: 'Lớp Kiểm Thử',
      progressValue: 60,
      status: '',
      teacherName: ['Trần Vĩ Nhân'],
    },
    {
      id: 2,
      imageAlt: '',
      imageUrl: image.mockCourse,
      name: 'Lớp Kiểm Thử',
      progressValue: 40,
      status: '',
      teacherName: ['Trần Vĩ Nhân'],
    },
  ];

  // useState
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    q: '',
    page: 0,
    size: 9,
    sort: undefined,
    status: 'ALL',
  });
  const [value, setValue] = useState(0);

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
  const handleChangeSearch = (searchValue: string) => {
    setFilterParams({
      ...filterParams,
      q: searchValue,
    });
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
        </Stack>
        <Stack marginTop={1}>
          <SearchTextField
            value={filterParams.q}
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
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

      <Grid container>
        {classes &&
          classes?.length !== 0 &&
          classes.map((item) => (
            <Grid
              item
              xs={12}
              md={3}
              key={item.id}
              sx={{ alignItems: 'stretch' }}
            >
              <MentorClassItem item={item} />
            </Grid>
          ))}
      </Grid>
      <Stack
        sx={{ justifyContent: 'center', alignItems: 'center', marginTop: 2 }}
      >
        <CustomPagination
          currentPage={1}
          totalPages={20}
          onChange={handleChangePageNumber}
        />
      </Stack>
    </Stack>
  );
}
