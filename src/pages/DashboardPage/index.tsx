import React, { useState } from 'react';

import { Stack, Typography, Drawer, IconButton, Box } from '@mui/material';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { scrollToTop } from '~/utils/common';
import { Color, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { mentorLMSRoutes } from '~/routes';
import { RoutePayload } from '~/models/routes';
import {
  MemberDashboardNavigationActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import Button from '~/components/atoms/Button';
import { MentorDashboardNavigationActionData } from '~/routes/navigators';
import { StudentDashboardNavigationActionData } from '~/routes/member/dashboard/navigation';
import { studentLMSRoutes } from '~/routes/member/dashboard/routes';
import DashboardSidebar from './DashboardSidebar';

export default function DashboardPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const roles = localStorage.getItem('roles');
  const isStudentRole = roles === 'ROLE_STUDENT';
  const rows = isStudentRole
    ? StudentDashboardNavigationActionData
    : MentorDashboardNavigationActionData;

  const routes = isStudentRole ? studentLMSRoutes : mentorLMSRoutes;

  const [isHover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChangeHover = (param: boolean) => {
    setHover(param);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleNavigateLink = (link: string) => {
    navigate(link);
  };

  const handleNavigateHomepage = () => {
    navigate(`/${NavigationLink.homepage}`);
  };

  const showDashboardRoutes = () => {
    let result = null;

    if (routes.length > 0) {
      result = routes.map((route: RoutePayload) => {
        return (
          <Route key={route.path} path={route.path} element={route?.main()} />
        );
      });
    }

    return result;
  };

  React.useEffect(() => {
    scrollToTop();
  }, []);

  const isClassDetailPage =
    pathname.includes(
      MentorDashboardNavigationActionLink.mentor_class_detail
    ) || pathname.includes(MemberDashboardNavigationActionLink.quiz);

  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        position: 'relative',
        minHeight: '100vh',
        background: Color.white4,
      }}
    >
      {!isClassDetailPage && (
        <>
          <Stack
            sx={{
              background: Color.navy,
              padding: 1,
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <IconButton onClick={handleOpen}>
                <Icon name="menu" size="medium" color="white" />
              </IconButton>
            </Box>
            <Box>
              <Button
                onClick={handleNavigateHomepage}
                customVariant="form"
                startIcon={<Icon name="return" size="small_20" color="white" />}
              >
                <Typography
                  sx={{
                    marginLeft: 1,
                  }}
                >
                  Trở về trang chủ
                </Typography>
              </Button>
            </Box>
            <Drawer
              sx={{
                ':-webkit-scrollbar': {
                  display: 'none',
                },
              }}
              anchor="left"
              open={open}
              onClose={handleOpen}
            >
              <DashboardSidebar
                isMobile
                isHover={isHover}
                onNavigateHomepage={handleNavigateHomepage}
                onNavigateLink={handleNavigateLink}
                onTriggerHover={handleChangeHover}
                rows={rows}
              />
            </Drawer>
          </Stack>

          <Stack
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <DashboardSidebar
              isHover={isHover}
              onNavigateHomepage={handleNavigateHomepage}
              onNavigateLink={handleNavigateLink}
              onTriggerHover={handleChangeHover}
              rows={rows}
            />
          </Stack>
        </>
      )}

      <Stack
        sx={{
          padding: !isClassDetailPage
            ? {
                xs: MetricSize.small_10,
                md: 5,
              }
            : 'none',
          flexGrow: 1,
        }}
      >
        {/* <DashboardBreadcrumbNavigation /> */}
        <Routes>{showDashboardRoutes()}</Routes>
      </Stack>
    </Stack>
  );
}
