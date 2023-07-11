import { useEffect, useState } from 'react';

import { Grid, Stack, Typography, Divider, Alert } from '@mui/material';

import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { StepPayload } from '~/components/molecules/CustomStepper';

import {
  useEffectScrollToTop,
  useQueryGetAllCourse,
  useQueryGetAllMemberCourses,
  useQueryGetAllMentorClasses,
  useQueryGetCourseContent,
  useQueryGetMentorCourseClasses,
  useQueryGetMentorCourses,
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
import Content from '~/containers/MentorCourseDetail/Content';
import { ClassStatusKeys, LevelKeys } from '~/models/variables';
import { formatStringToNumber } from '~/utils/number';
import RequiredEdit from './RequiredEdit';
import { LoadingWrapper } from '~/HOCs';
import { useQueryGetDetailUserCourse } from '~/hooks/course/useQueryGetDetailUserCourse';
import ReturnLink from '~/components/atoms/ReturnLink';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import DashboardNavigationTabs from '~/components/atoms/tabs/DashboardNavigationTabs';

export interface MentorDetailCoursePayload {
  code: string;
  name: string;
  categoryId: OptionPayload;
  subjectId: OptionPayload;
  description: string;
  status: ClassStatusKeys;
  level: LevelKeys;
}

export interface DetailCourseClassPayload {
  id: string;
  code: string;
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
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    data: dataCourse,
    error,
    isLoading,
  } = useQueryGetDetailUserCourse(formatStringToNumber(id));
  const tempCourse = dataCourse?.course;
  const {
    data,
    error: classError,
    isLoading: classLoading,
    refetch: classRefetch,
  } = useQueryGetMentorCourseClasses({
    id: formatStringToNumber(id),
    params: {
      q: '',
      page: 0,
      size: 20000,
    },
  });
  const classes = data?.items;
  const currentPage = data?.currentPage;
  const pageSize = data?.pageSize;

  const course: MentorDetailCoursePayload | undefined = {
    description: tempCourse?.courseDescription || '',
    categoryId: tempCourse?.category || {
      id: 0,
      value: '',
      label: '',
    },
    code: tempCourse?.courseCode || '',
    level: tempCourse?.level || 'ADVANCED',
    name: tempCourse?.courseName || '',
    status: tempCourse?.status || 'REQUESTING',
    subjectId: tempCourse?.subject || {
      id: 0,
      value: '',
      label: '',
    },
  };

  const {
    data: content,
    error: contentError,
    isLoading: contentLoading,
  } = useQueryGetCourseContent(formatStringToNumber(id));

  // const {
  //   data: mentorCourse,
  //   error,
  //   isLoading,
  // } = useQueryGetDetailMentorCourse(formatStringToNumber(id));

  // const course = mentorCourse?.course;
  // const classes = mentorCourse?.classes;
  // const content = mentorCourse?.content;

  // const { optionCategories } = useDispatchGetAllCategories();
  // const { optionSubjects } = useDispatchGetAllSubjects();
  // const course: MentorDetailCoursePayload = {
  //   code: '123',
  //   level: mockLevelData[0],
  //   name: 'Khóa học kiểm thử 1',
  //   description: 'Xin Chào Các Bạn',
  //   subjectId: optionSubjects[0],
  //   categoryId: optionCategories[0],
  //   // status: 'REQUESTING',
  //   status: 'EDITREQUEST',
  // };

  // const mockClasses: DetailCourseClassPayload[] = [
  //   {
  //     endDate: new Date().toString(),
  //     imageAlt: 'Logo CLass',
  //     imageUrl: '',
  //     id: '345',
  //     maxStudent: 30,
  //     minStudent: 15,
  //     numberOfSlot: 30,
  //     price: 100000,
  //     startDate: new Date().toString(),
  //     timeInWeekRequests: [
  //       {
  //         dayOfWeekId: 1,
  //         slotId: 1,
  //       },
  //     ],
  //   },
  // ];

  // const course = mockCourse;
  // const classes = mockClasses;

  const handleSubmitCourse = () => {
    // TODO: Phe duyet khoa hoc
  };

  const handleNavigateLink = (link: string) => {
    navigate(
      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${id}/${link}`
    );
  };

  useEffectScrollToTop();

  useEffect(() => {
    const handleBrowserBackButton = (event: any) => {
      event.preventDefault();
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_list}`,
        { replace: true }
      );
    };

    window.addEventListener('popstate', handleBrowserBackButton);

    return () => {
      window.removeEventListener('popstate', handleBrowserBackButton);
    };
  }, [navigate]);

  // TODO: Thêm validation cho các biến sau đây
  const isCompletedInformationCourse = true;
  const isAddedContent = content?.length !== 0;
  const isAddedClasses = classes?.length !== 0;

  const steps: StepPayload[] = [
    {
      id: 0,
      isCompleted: isCompletedInformationCourse,
      label: 'Thêm thông tin khóa học',
      description:
        'Xem lại khóa học vừa tạo của bạn. Khóa học này sẽ được hiển thị ra ngoài cho học sinh xem và đăng kí.',
    },
    {
      id: 1,
      isCompleted: isAddedContent,
      label: 'Thêm nội dung khóa học',
      description:
        'Thêm nội dung giảng dạy để học sinh có thể biết chương trình học của bạn thú vị ra sao.',
    },
    {
      id: 2,
      isCompleted: isAddedClasses,
      label: 'Thêm danh sách lớp học',
      description:
        'Thêm lớp và khung giờ học phù hợp với lịch làm việc của bạn.',
    },
  ];

  const navigationTabData: {
    id: number;
    link: string;
    name: string;
    icon: IconName;
    isHide?: boolean;
    component: React.ReactNode;
  }[] = [
    {
      id: 0,
      link: 'edit',
      name: 'Yêu cầu chỉnh sửa',
      component: <RequiredEdit />,
      icon: 'squareCheckbox',
      isHide: course?.status !== 'EDITREQUEST',
    },
    {
      id: 1,
      link: 'tutorial',
      name: 'Hướng dẫn',
      icon: 'squareCheckbox',
      isHide: course?.status !== 'REQUESTING',
      component: <TutorialRequestCourse steps={steps} />,
    },
    {
      id: 2,
      link: 'information',
      name: 'Thông tin khóa học',
      icon: 'squareCheckbox',
      component: <EditCourse id={formatStringToNumber(id)} course={course} />,
    },
    {
      id: 3,
      link: 'content',
      name: 'Nội dung',
      icon: isAddedContent ? 'squareCheckbox' : 'blankSquareCheckbox',
      component: <Content id={formatStringToNumber(id)} />,
    },
    {
      id: 4,
      link: 'classes',
      name: 'Danh sách lớp học',
      icon: isAddedClasses ? 'squareCheckbox' : 'blankSquareCheckbox',
      component: (
        <CreateClassesForm
          id={formatStringToNumber(id)}
          classes={classes}
          error={classError}
          isLoading={classLoading}
          refetch={classRefetch}
        />
      ),
    },
  ];
  console.log('pathname', pathname);

  const showRoutes = () => {
    let result = null;
    const showNavigationTabData = navigationTabData.filter(
      (item) => !item.isHide
    );
    result = (
      <>
        <Route
          key="/"
          path="/"
          element={
            <Navigate
              to={`/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${id}/${showNavigationTabData[0].link}`}
            />
          }
        />
        {showNavigationTabData.map((route) => {
          if (route.isHide) return null;
          return (
            <Route
              key={route.link}
              path={route.link}
              element={route.component}
            />
          );
        })}
      </>
    );

    return result;
  };

  return (
    <Stack>
      <ReturnLink
        to={`/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_list}`}
      />
      <Typography sx={globalStyles.textSubTitle}>Chi tiết khóa học</Typography>
      <Typography sx={globalStyles.textLowSmallLight}>
        Nội dung chi tiết của khóa học
      </Typography>
      <LoadingWrapper isLoading={isLoading} error={error}>
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
                {navigationTabData.map((item, index) => {
                  return (
                    <DashboardNavigationTabs
                      key={index}
                      icon={item.icon}
                      isActive={pathname.includes(item.link)}
                      link={item.link}
                      name={item.name}
                      isHide={item.isHide}
                    />
                  );
                })}
              </Stack>
              <Stack margin={2}>
                {course?.status === 'NOTSTART' && (
                  <Alert sx={{ marginY: 1 }} severity="success">
                    Khóa học đã được phê duyệt thành công
                  </Alert>
                )}
                {course?.status === 'REJECTED' && (
                  <Alert sx={{ marginY: 1 }} severity="error">
                    Khóa học đã bị từ chối. Nội dung sẽ bị khóa vĩnh viễn
                  </Alert>
                )}
                {course?.status === 'EDITREQUEST' && (
                  <Alert sx={{ marginY: 1 }} severity="warning">
                    Hệ thống yêu cầu chỉnh sửa một số nội dung trước khi phê
                    duyệt lại. Vui lòng xem mục{' '}
                    <span
                      style={{
                        fontSize: FontSize.small_14,
                        fontFamily: FontFamily.bold,
                      }}
                    >
                      Yêu cầu chỉnh sửa
                    </span>{' '}
                    để biết thêm chi tiết.
                  </Alert>
                )}
                {(course?.status === 'REQUESTING' ||
                  course?.status === 'EDITREQUEST') && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleSubmitCourse}
                  >
                    Phê duyệt khóa học
                  </Button>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={10} paddingX={4}>
              <Routes>{showRoutes()}</Routes>
              {/* {navigationTabData.map((item) => {
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
              })} */}
            </Grid>
          </Grid>
        </Stack>
      </LoadingWrapper>
    </Stack>
  );
}
