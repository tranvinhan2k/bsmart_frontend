import { useContext, useEffect, useMemo, useState } from 'react';

import { Grid, Stack, Typography, CircularProgress, Box } from '@mui/material';

import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { useForm } from 'react-hook-form';
import {
  useEffectScrollToTop,
  useQueryGetMentorCourseClasses,
  useSubmitForReviewCourse,
} from '~/hooks';
import Button from '~/components/atoms/Button';
import globalStyles from '~/styles';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
// eslint-disable-next-line import/no-cycle
import { OptionPayload } from '~/models';
import {
  ClassStatusKeys,
  CourseStatusKeys,
  LevelKeys,
} from '~/models/variables';
import { formatStringToNumber } from '~/utils/number';
import { LoadingWrapper } from '~/HOCs';
import ReturnLink from '~/components/atoms/ReturnLink';
import {
  MentorCourseActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import Sidebar from './Sidebar';
import CourseAlert from './CourseAlert';
import { mentorCourseRoutes } from '~/routes/mentor/course/routes';
import toast from '~/utils/toast';
import CustomModal from '~/components/atoms/CustomModal';
import FormInput from '~/components/atoms/FormInput';
import { handleConsoleError } from '~/utils/common';
import CourseContextProvider, {
  CourseContext,
} from '~/HOCs/context/CourseContext';

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
  id: number;
  code: string;
  imageUrl: string;
  imageAlt: string;
  price: number;
  minStudent: number;
  maxStudent: number;
  startDate: string;
  status: CourseStatusKeys;
  endDate: string;
  numberOfSlot: number;
  purchase: boolean;
  timeInWeekRequests: {
    dayOfWeekId: number;
    slotId: number;
  }[];
}

export default function MentorCourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { course, classes, percent, refetchPercent } =
    useContext(CourseContext);
  const [open, setOpen] = useState(false);

  const data: OptionPayload[] | undefined = classes
    ?.filter((item) => item.status === 'REQUESTING')
    .map((item, index) => ({
      id: index,
      label: `Lớp ${item.code}`,
      value: `${item.id}`,
    }));

  const hookForm = useForm<{ classes: string[] }>({
    defaultValues: {
      classes: useMemo(() => classes?.map((item) => `${item.id}`), [classes]),
    },
  });

  useEffect(() => {
    if (classes) {
      hookForm.reset({
        classes: classes?.map((item) => `${item.id}`),
      });
    }
  }, [classes, hookForm]);

  const { handleSubmitForReview, handleTryCatch } = useSubmitForReviewCourse();

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleSubmitCourse = async (paramData: { classes: string[] }) => {
    if (percent.allowSendingApproval) {
      if (paramData && paramData?.classes.length > 0) {
        await handleTryCatch(async () =>
          handleSubmitForReview({
            id: formatStringToNumber(id),
            params: paramData.classes.map((item) => formatStringToNumber(item)),
          })
        );
        handleOpen();
        window.location.reload();
      } else {
        toast.notifyErrorToast('Chưa chọn lớp để phê duyệt');
      }
    } else {
      toast.notifyErrorToast('Chưa đủ điều kiện để phê duyệt');
    }
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

  const showRoutes = () => {
    return mentorCourseRoutes.map((route, index) => {
      if (
        course.status !== route.courseStatus &&
        route.courseStatus !== 'ALL'
      ) {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Navigate
                to={`/${NavigationLink.dashboard}/${
                  MentorDashboardNavigationActionLink.mentor_course_detail
                }/${formatStringToNumber(id)}/${
                  MentorCourseActionLink.information
                }`}
                replace
              />
            }
          />
        );
      }
      if (index === 0) {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Navigate
                to={
                  // eslint-disable-next-line no-nested-ternary
                  course.status === 'EDITREQUEST'
                    ? MentorCourseActionLink.edit_request
                    : course.status === 'REQUESTING'
                    ? MentorCourseActionLink.tutorial
                    : MentorCourseActionLink.information
                }
              />
            }
          />
        );
      }
      return (
        <Route key={route.path} path={route.path} element={route.main()} />
      );
    });
  };

  return (
    <CourseContextProvider>
      <Stack>
        <ReturnLink
          to={`/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_list}`}
        />
        <Typography sx={globalStyles.textSubTitle}>
          Chi tiết khóa học
        </Typography>
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
                <Sidebar status={course.status} />
              </Stack>
              <Stack margin={2}>
                <CourseAlert status={course.status || 'ALL'} />
                {(course?.status === 'REQUESTING' ||
                  course?.status === 'EDITREQUEST' ||
                  (data && data?.length > 0)) && (
                  <Stack sx={globalStyles.viewCenter}>
                    <Typography
                      textAlign="center"
                      sx={{
                        width: '170px',
                        color: Color.black,
                        fontSize: FontSize.small_14,
                        fontFamily: FontFamily.bold,
                      }}
                    >
                      Phần trăm hoàn thành các bước phê duyệt
                    </Typography>
                    <Stack
                      sx={{
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                      }}
                    >
                      <CircularProgress
                        color="secondary"
                        variant={
                          percent.allowSendingApproval
                            ? 'indeterminate'
                            : 'determinate'
                        }
                        value={percent.percentComplete}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color="text.secondary"
                        >{`${Math.round(
                          percent.percentComplete || 0
                        )}%`}</Typography>
                      </Box>
                    </Stack>
                    <Button
                      sx={{
                        marginTop: 1,
                        color: Color.white,
                      }}
                      variant="contained"
                      color="secondary"
                      disabled={Math.round(percent.percentComplete || 0) < 100}
                      onClick={handleOpen}
                    >
                      Gửi yêu cầu phê duyệt
                    </Button>

                    <CustomModal open={open} onClose={handleOpen}>
                      <Stack sx={{ padding: 1, minWidth: '60vw' }}>
                        <Typography
                          sx={{
                            ...globalStyles.textSubTitle,
                            textAlign: 'center',
                          }}
                        >
                          Chọn lớp học để phê duyệt
                        </Typography>
                        <Stack
                          sx={{
                            paddingY: 2,
                          }}
                        >
                          <FormInput
                            control={hookForm.control}
                            name="classes"
                            data={data}
                            variant="multiSelect"
                          />
                        </Stack>
                        <Stack>
                          <Button
                            onClick={hookForm.handleSubmit(
                              handleSubmitCourse,
                              handleConsoleError
                            )}
                            variant="contained"
                          >
                            Gửi yêu cầu phê duyệt
                          </Button>
                        </Stack>
                      </Stack>
                    </CustomModal>
                  </Stack>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={10} paddingX={4}>
              <Routes>{showRoutes()}</Routes>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </CourseContextProvider>
  );
}
