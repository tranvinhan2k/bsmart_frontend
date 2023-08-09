import { Stack, Typography, Box, Tabs, Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { LoadingWrapper } from '~/HOCs';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import ClassStatusLabel from '~/components/atoms/ClassStatusLabel';
import CustomPagination from '~/components/atoms/CustomPagination';
import SearchFilterClasses from '~/components/atoms/SearchFilterClasses';
import MentorClassItem from '~/components/molecules/MentorClassItem';
import { ClassStatusList } from '~/constants';
import { useQueryGetUserClass } from '~/hooks';
import { ClassStatusKeys } from '~/models/variables';
import globalStyles from '~/styles';
import { scrollToTop } from '~/utils/common';
import { formatStringToNumber } from '~/utils/number';
import toast from '~/utils/toast';

const TEXTS = {
  title_1: 'Danh sách lớp học',
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
  // useState
  const {
    filterParams,
    classes,
    currentPage,
    error,
    handleChangeStatus,
    handleChangePage,
    handleChangeSearchValue,
    handleFilter,
    isLoading,
    allClasses,
    totalPage,
  } = useQueryGetUserClass('TEACHER');
  const [classStatus, setClassStatus] = useState<ClassStatusKeys>(
    filterParams.status || 'ALL'
  );
  // parameters
  const chosenClassStatus = ClassStatusList.find(
    (item) => item.value === filterParams.status
  );

  // functions

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: ClassStatusKeys
  ) => {
    setClassStatus(newValue);
  };
  const handleChangePageNumber = (e: any, pageNumber: number) => {
    handleChangePage(pageNumber - 1);
  };
  const handleChangeSearch = (searchValue: string) => {
    handleChangeSearchValue(searchValue);
  };

  const onSubmit = (data: {
    startDate: Date;
    endDate: Date;
    subjectId: string[];
  }) => {
    const params = {
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
      subjectId: data.subjectId.map((item) => formatStringToNumber(item)),
    };

    handleFilter(params);

    toast.notifySuccessToast('Đã lọc kết quả');
  };

  const handleChangeClassStatus = (param: string) => {
    handleChangeStatus(param as ClassStatusKeys);
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
        <SearchFilterClasses
          endDate={filterParams.endDate || ''}
          searchValue={filterParams.q || ''}
          onFilter={onSubmit}
          onSearchValue={handleChangeSearch}
          startDate={filterParams.startDate || ''}
          subjectId={filterParams.subjectId || []}
        />
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
            value={classStatus}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {ClassStatusList.map((item, index) => (
              <Tab
                onClick={() => handleChangeClassStatus(item.value)}
                key={index}
                label={
                  <ClassStatusLabel
                    label={item.label}
                    numberOfItem={
                      allClasses?.reduce((total: number, subItem) => {
                        if (
                          item.value === 'ALL' ||
                          subItem.status === item.value
                        ) {
                          return total + 1;
                        }
                        return total;
                      }, 0) || 0
                    }
                  />
                }
                value={item.value}
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

      <LoadingWrapper
        isLoading={isLoading}
        error={error}
        isEmptyCourse={classes?.length === 0}
      >
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
      </LoadingWrapper>
      <Stack
        sx={{ justifyContent: 'center', alignItems: 'center', marginTop: 2 }}
      >
        {classes && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPage}
            onChange={handleChangePageNumber}
          />
        )}
      </Stack>
    </Stack>
  );
}
