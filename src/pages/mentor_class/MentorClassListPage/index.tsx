import { Stack, Typography, Box, Tabs, Tab, Collapse } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingWrapper } from '~/HOCs';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomPagination from '~/components/atoms/CustomPagination';
import InputGroup from '~/components/atoms/FormInput/InputGroup';
import Icon from '~/components/atoms/Icon';
import { SearchTextField } from '~/components/atoms/textField/SearchTextField';
import MentorClassItem from '~/components/molecules/MentorClassItem';
import { ClassStatusList } from '~/constants';
import { validationClassListFilter } from '~/form/validation';
import {
  useDispatchGetAllSubjects,
  useQueryGetUserClass,
  useYupValidationResolver,
} from '~/hooks';
import { ClassStatusKeys } from '~/models/variables';
import globalStyles from '~/styles';
import { handleConsoleError, scrollToTop } from '~/utils/common';
import { formatStringToNumber } from '~/utils/number';
import toast from '~/utils/toast';

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
  const resolver = useYupValidationResolver(validationClassListFilter);
  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: {
      startDate: new Date('01/01/2000'),
      endDate: new Date('01/01/2099'),
      subjectId: [],
    },
  });
  const { optionSubjects } = useDispatchGetAllSubjects();
  // useState
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const {
    filterParams,
    classes,
    currentPage,
    error,
    handleChangeStatus,
    handleChangeEndDate,
    handleChangePage,
    handleChangeSearchValue,
    handleChangeStartDate,
    handleChangeSubjectId,
    isLoading,
    totalPage,
  } = useQueryGetUserClass();
  // parameters
  const chosenClassStatus = ClassStatusList.find(
    (item) => item.value === filterParams.status
  );

  // functions
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangePageNumber = (e: any, pageNumber: number) => {
    handleChangePage(pageNumber - 1);
  };
  const handleChangeSearch = (searchValue: string) => {
    handleChangeSearchValue(searchValue);
  };

  const onSubmit = (data: {
    startDate: string;
    endDate: string;
    subjectId: string[];
  }) => {
    handleChangeStartDate(data.startDate);
    handleChangeEndDate(data.endDate);
    handleChangeSubjectId(
      data.subjectId.map((item) => formatStringToNumber(item))
    );
    toast.notifySuccessToast('Đã lọc kết quả');
  };

  const handleChangeClassStatus = (classStatus: string) => {
    handleChangeStatus(classStatus as ClassStatusKeys);
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
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          marginTop={1}
        >
          <Stack sx={{ flexGrow: 1 }}>
            <SearchTextField
              value={filterParams.q}
              onChange={(e) => handleChangeSearch(e.target.value)}
            />
          </Stack>
          <Stack
            sx={{
              marginLeft: 1,
            }}
          >
            <Button
              onClick={handleOpen}
              sx={{
                height: '38px',
              }}
              variant="contained"
            >
              <Icon name="filter" size="small_20" color="white" />
            </Button>
          </Stack>
        </Stack>
        <Collapse in={open}>
          <Stack
            sx={{
              alignItems: 'flex-start',
              marginY: 1,
            }}
          >
            <InputGroup
              control={control}
              inputList={[
                {
                  label: 'Ngày bắt đầu',
                  name: 'startDate',
                  placeholder: 'Nhập ngày bắt đầu',
                  variant: 'date',
                },
                {
                  label: 'Ngày kết thúc',
                  name: 'endDate',
                  placeholder: 'Nhập ngày kết thúc',
                  variant: 'date',
                },
                {
                  label: 'Danh sách môn học',
                  name: 'subjectId',
                  placeholder: 'Nhập môn học',
                  variant: 'multiSelect',
                  data: optionSubjects,
                },
              ]}
            />
            <Button
              sx={{ marginTop: 1 }}
              onClick={handleSubmit(onSubmit, handleConsoleError)}
              variant="contained"
            >
              Lọc kết quả tìm kiếm
            </Button>
          </Stack>
        </Collapse>
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
