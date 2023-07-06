import { useEffect, useState } from 'react';

import { Grid, Stack, Typography, Divider } from '@mui/material';

import { useParams } from 'react-router-dom';
import { StepPayload } from '~/components/molecules/CustomStepper';

import {
  useDispatchGetAllCategories,
  useDispatchGetAllSubjects,
  useEffectScrollToTop,
} from '~/hooks';
import Button from '~/components/atoms/Button';
import globalStyles from '~/styles';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon, { IconName } from '~/components/atoms/Icon';
// eslint-disable-next-line import/no-cycle
import EditCourse from './EditCourse';
import { OptionPayload } from '~/models';
import TutorialRequestCourse from './TutorialRequestCourse';
import CreateClassesForm from '~/components/molecules/FormComponent/CreateClassesForm';
import { mockLevelData } from '~/constants';
import Content from '~/containers/MentorCourseDetail/Content';
import { ClassStatusKeys } from '~/models/variables';

export interface DetailCoursePayload {
  name: string;
  categoryId: OptionPayload;
  subjectId: OptionPayload;
  description: string;
  image: string;
  status: ClassStatusKeys;
}

export interface DetailCourseClassPayload {
  id: 0;
  level: OptionPayload;
  imageUrl: string;
  imageAlt: string;
  price: number;
  minStudent: number;
  maxStudent: number;
  startDate: string;
  endDate: string;
  numberOfSlot: number;
  timeInWeekRequests: {
    dayOfWeekId: number;
    slotId: number;
  }[];
}

export default function MentorCourseDetailPage() {
  const { id } = useParams();
  const { optionSubjects } = useDispatchGetAllSubjects();
  const { optionCategories } = useDispatchGetAllCategories();
  const mockCourse: DetailCoursePayload = {
    name: 'Khóa học kiểm thử 1',
    description: 'Xin Chào Các Bạn',
    image: '',
    subjectId: optionSubjects[0],
    categoryId: optionCategories[0],
    status: 'REQUESTING',
  };

  const mockClasses: DetailCourseClassPayload[] = [
    {
      endDate: new Date().toString(),
      imageAlt: 'Logo CLass',
      imageUrl: '',
      id: 0,
      level: mockLevelData[0],
      maxStudent: 30,
      minStudent: 15,
      numberOfSlot: 30,
      price: 100000,
      startDate: new Date().toString(),
      timeInWeekRequests: [
        {
          dayOfWeekId: 1,
          slotId: 1,
        },
      ],
    },
  ];

  const course = mockCourse;
  // const classes = mockClasses;

  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTabIndex = (param: number) => {
    setTabIndex(param);
  };

  const handleSubmitCourse = () => {};

  useEffectScrollToTop();

  // TODO: Thêm validation cho các biến sau đây
  const isCompletedInformationCourse = true;
  const isAddedContent = true;
  const isAddedClasses = false;

  const steps: StepPayload[] = [
    {
      id: 0,
      isCompleted: isCompletedInformationCourse,
      label: 'Thêm thông tin khóa học',
      onClick: () => handleChangeTabIndex(1),
      description:
        'Xem lại khóa học vừa tạo của bạn. Khóa học này sẽ được hiển thị ra ngoài cho học sinh xem và đăng kí.',
    },
    {
      id: 1,
      isCompleted: isAddedContent,
      label: 'Thêm nội dung khóa học',
      onClick: () => handleChangeTabIndex(2),

      description:
        'Thêm nội dung giảng dạy để học sinh có thể biết chương trình học của bạn thú vị ra sao.',
    },
    {
      id: 2,
      isCompleted: isAddedClasses,
      label: 'Thêm danh sách lớp học',
      onClick: () => handleChangeTabIndex(3),

      description:
        'Thêm lớp và khung giờ học phù hợp với lịch làm việc của bạn.',
    },
  ];

  const navigationTabData: {
    id: number;
    name: string;
    icon: IconName;
    isHide?: boolean;
    component: React.ReactNode;
  }[] = [
    {
      id: 0,
      name: 'Hướng dẫn',
      icon: 'squareCheckbox',
      isHide: mockCourse.status !== 'REQUESTING',
      component: <TutorialRequestCourse steps={steps} />,
    },
    {
      id: 1,
      name: 'Thông tin khóa học',
      icon: 'squareCheckbox',
      component: <EditCourse course={course} />,
    },
    {
      id: 2,
      name: 'Nội dung',
      icon: 'blankSquareCheckbox',
      component: <Content />,
    },
    {
      id: 3,
      name: 'Danh sách lớp học',
      icon: 'blankSquareCheckbox',
      component: (
        <CreateClassesForm classes={mockClasses} onChangeClasses={() => {}} />
      ),
    },
  ];

  useEffect(() => {
    if (navigationTabData[tabIndex].isHide) {
      setTabIndex(tabIndex + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex]);

  return (
    <Stack>
      <Typography sx={globalStyles.textSubTitle}>Chi tiết khóa học</Typography>
      <Typography sx={globalStyles.textLowSmallLight}>
        Nội dung chi tiết của khóa học
      </Typography>
      <Stack
        sx={{
          marginTop: 1,
          background: Color.white,
          borderRadius: MetricSize.small_5,
          paddingY: 4,
        }}
      >
        <Grid container>
          <Grid item xs={12} md={2}>
            <Stack marginRight={2}>
              {navigationTabData.map((item) => {
                if (item.isHide) return null;
                return (
                  <Stack
                    onClick={() => handleChangeTabIndex(item.id)}
                    key={item.id}
                    sx={{
                      position: 'relative',
                      flexDirection: 'row',
                      alignItems: 'center',
                      background: tabIndex === item.id ? Color.grey3 : 'none',
                      paddingY: 2,
                      paddingX: 2,
                      borderTopRightRadius: MetricSize.small_5,
                      borderBottomRightRadius: MetricSize.small_5,
                      transition: 'all 500ms ease',
                      fontSize: FontSize.small_14,
                      fontFamily: FontFamily.light,
                      color: tabIndex === item.id ? Color.black : Color.grey,
                      ':hover': {
                        background: Color.whiteSmoke,
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <Stack marginRight={1}>
                      <Icon
                        name={item.icon}
                        size="small"
                        color={tabIndex === item.id ? 'black' : 'grey'}
                      />
                    </Stack>
                    {item.name}
                  </Stack>
                );
              })}
            </Stack>
            <Stack margin={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleSubmitCourse}
              >
                Phê duyệt khóa học
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={10} paddingX={4}>
            {navigationTabData.map((item) => {
              if (item.isHide) return null;
              return (
                <Stack
                  sx={{
                    display: tabIndex === item.id ? 'flex' : 'none',
                  }}
                  key={item.id}
                >
                  <Stack>
                    <Typography sx={globalStyles.textSubTitle}>
                      {item.name}
                    </Typography>
                    <Divider />
                  </Stack>
                  <Stack marginTop={2}>{item.component}</Stack>
                </Stack>
              );
            })}
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}
