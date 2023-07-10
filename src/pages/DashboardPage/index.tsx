import React, { useState } from 'react';

import { Stack, Typography, Drawer, IconButton, Box } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { scrollToTop } from '~/utils/common';
import { Color, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { mentorLMSRoutes } from '~/routes';
import { RoutePayload } from '~/models/routes';
import { NavigationLink } from '~/constants/routeLink';
import DashboardBreadcrumbNavigation from '~/components/molecules/navigations/DashboardBreadcrumbNavigation';
import Button from '~/components/atoms/Button';
import { MentorDashboardNavigationActionData } from '~/routes/navigators';
import { selectProfile } from '~/redux/user/selector';
import { StudentDashboardNavigationActionData } from '~/routes/member/dashboard/navigation';
import { studentLMSRoutes } from '~/routes/member/dashboard/routes';
import DashboardSidebar from './DashboardSidebar';
import globalStyles from '~/styles';

export default function DashboardPage() {
  const navigate = useNavigate();

  const profile = useSelector(selectProfile);

  const rows =
    profile.roles?.[0]?.code === 'STUDENT'
      ? StudentDashboardNavigationActionData
      : MentorDashboardNavigationActionData;

  const routes =
    profile.roles?.[0]?.code === 'STUDENT' ? studentLMSRoutes : mentorLMSRoutes;

  const [activeIndex, setActiveIndex] = useState(0);
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

  const handleSetActiveIndex = (idx: number) => {
    setActiveIndex(idx);
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
      result = mentorLMSRoutes.map((route: RoutePayload) => {
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

  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        position: 'relative',
        minHeight: '100vh',
        background: Color.white4,
      }}
    >
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
              activeIndex={activeIndex}
              isHover={isHover}
              onChangeActiveIndex={handleSetActiveIndex}
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
            activeIndex={activeIndex}
            isHover={isHover}
            onChangeActiveIndex={handleSetActiveIndex}
            onNavigateHomepage={handleNavigateHomepage}
            onNavigateLink={handleNavigateLink}
            onTriggerHover={handleChangeHover}
            rows={rows}
          />
        </Stack>
      </>

      <Stack
        sx={{
          padding: {
            xs: MetricSize.small_10,
            md: 5,
          },
          flexGrow: 1,
        }}
      >
        {/* <DashboardBreadcrumbNavigation /> */}
        <Routes>{showDashboardRoutes()}</Routes>
      </Stack>
    </Stack>
  );
}
