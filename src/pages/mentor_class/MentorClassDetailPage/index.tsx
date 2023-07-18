import { Grid, Stack, Typography, IconButton, Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import Icon, { IconName } from '~/components/atoms/Icon';
import { scrollToTop } from '~/utils/common';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import Sidebar from './Sidebar';
import { MentorClassAttendanceListPage } from '~/routes/components';
import MentorClassInformationPage from '../MentorClassInformationPage';
import { mentorClassRoutes } from '~/routes/mentor/class/routes';

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

  const showRoutes = () => {
    let result = null;

    result = mentorClassRoutes.map((route) => {
      return (
        <Route key={route.path} path={route.path} element={route.main()} />
      );
    });

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
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10} paddingY={2} paddingX={4}>
          <Routes>{showRoutes()}</Routes>
        </Grid>
      </Grid>
      <Drawer open={open} onClose={handleClose}>
        <Stack paddingRight={2}>
          <Sidebar />
        </Stack>
      </Drawer>
    </Stack>
  );
}
