import { Grid, Stack, Typography, IconButton, Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Icon from '~/components/atoms/Icon';
import { scrollToTop } from '~/utils/common';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import Sidebar from './Sidebar';
import { memberClassRoutes } from '~/routes/member/class/routes';
import ClassHeader from '~/components/molecules/header/ClassHeader';

export interface DetailMemberClassPayload {
  code: string;
  courseName: string;
}

export default function MemberClassDetailPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const memberClass: DetailMemberClassPayload = {
    code: 'ada43c',
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

    result = memberClassRoutes.map((route) => {
      return (
        <Route key={route.path} path={route.path} element={route.main()} />
      );
    });

    return result;
  };

  const navigateMemberClass = () => {
    navigate(
      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_list}`
    );
  };

  return (
    <Stack>
      <ClassHeader
        classCode={memberClass.code}
        courseName={memberClass.courseName}
        onCloseDrawerMenu={handleClose}
        onReturnClassList={navigateMemberClass}
      />
      <Grid container sx={{ background: Color.white4, minHeight: '100vh' }}>
        <Grid
          sx={{
            paddingY: 2,
            background: Color.white,
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
