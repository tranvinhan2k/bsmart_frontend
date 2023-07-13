import { Grid, Stack, Typography, IconButton, Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import Icon, { IconName } from '~/components/atoms/Icon';
import { scrollToTop } from '~/utils/common';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import DashboardNavigationTabs from '~/components/atoms/tabs/DashboardNavigationTabs';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import Sidebar from './Sidebar';
import {
  MentorAssignmentDetailsPage,
  MentorAttendanceListPage,
  MentorQuizSettingsPage,
} from '~/routes/components';
import MentorClassInformationPage from '../MentorClassInformationPage';
import MentorTakeAttendancePage from '../MentorTakeAttendancePage';
import MentorTakeAttendance from '~/components/molecules/AttendanceManagement/MentorTakeAttendance';
import MentorStudentListPage from '../MentorStudentListPage';
import MentorSchedulePage from '../MentorSchedulePage';

export interface DetailMemberClassPayload {
  code: string;
  courseName: string;
}

export default function MentorClassDetailPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const memberClass: DetailMemberClassPayload = {
    code: '#ada43c',
    courseName: 'Khóa học kiểm thử #12',
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleClose = () => {
    setOpen(!open);
  };

  const navigationTabs: {
    id: number;
    link: string;
    name: string;
    icon: IconName;
    component: React.ReactNode;
    isHide?: boolean | undefined;
  }[] = [
    {
      id: 0,
      icon: 'class',
      link: 'information',
      name: 'Thông tin lớp học',
      component: <MentorClassInformationPage />,
    },
    {
      id: 1,
      icon: 'person',
      link: 'students',
      name: 'Danh sách học sinh',
      component: <MentorStudentListPage />,
    },
    {
      id: 1,
      icon: 'date',
      link: 'schedule',
      name: 'Lịch làm việc',
      component: <MentorSchedulePage />,
    },
    {
      id: 1,
      icon: 'attendance',
      link: 'attendance',
      name: 'Điểm danh',
      component: <MentorAttendanceListPage />,
    },
    {
      id: 2,
      icon: 'book',
      link: 'resource',
      name: 'Tài nguyên',
      component: <div>Tài Nguyên</div>,
    },
    {
      id: 3,
      icon: 'quiz',
      link: 'exercise',
      name: 'Kiểm tra',
      component: <MentorQuizSettingsPage />,
    },
    {
      id: 3,
      icon: 'assignment',
      link: 'assignment',
      name: 'Bài tập',
      component: <MentorAssignmentDetailsPage />,
    },
    {
      id: 4,
      icon: 'account',
      link: 'notification',
      name: 'Thông báo',
      component: <MentorAssignmentDetailsPage />,
    },
  ];

  const showRoutes = () => {
    let result = null;
    const showNavigationTabData = navigationTabs.filter((item) => !item.isHide);
    result = (
      <>
        <Route
          key="/"
          path="/"
          element={
            <Navigate
              to={`/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_detail}/${id}/${showNavigationTabData[0].link}`}
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
      <Stack
        sx={{
          background: Color.navy,
          paddingY: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={() =>
            navigate(
              `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_list}`
            )
          }
        >
          <Icon name="left" size="large" color="white" />
        </IconButton>
        <Typography
          noWrap
          sx={{
            flexGrow: 1,
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.regular,
            color: Color.white,
          }}
        >
          {`Lớp học ${memberClass.code} - `}
          <span
            style={{
              color: Color.grey,
              fontFamily: FontFamily.light,
            }}
          >
            {memberClass.courseName}
          </span>
        </Typography>
        <IconButton
          sx={{
            display: { xs: 'flex', md: 'none' },
          }}
          onClick={handleClose}
        >
          <Icon name="menu" size="large" color="white" />
        </IconButton>
      </Stack>
      <Grid container sx={{ background: Color.white, minHeight: '100vh' }}>
        <Grid
          sx={{
            paddingY: 2,
            background: Color.white4,
            borderRight: '1px solid #ddd',
            display: { xs: 'none', md: 'flex' },
          }}
          item
          xs={12}
          md={2}
        >
          <Sidebar navigationTabs={navigationTabs} />
        </Grid>
        <Grid item xs={12} md={10} paddingY={2} paddingX={4}>
          <Routes>{showRoutes()}</Routes>
        </Grid>
      </Grid>
      <Drawer open={open} onClose={handleClose}>
        <Stack paddingRight={2}>
          <Sidebar navigationTabs={navigationTabs} />
        </Stack>
      </Drawer>
    </Stack>
  );
}
