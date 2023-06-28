import React, { useState } from 'react';

import { Grid, Stack, Typography } from '@mui/material';
import { MenuItem, Sidebar, SubMenu, Menu } from 'react-pro-sidebar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { scrollToTop } from '~/utils/common';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { IconName } from '~/components/atoms/Icon';
import { mentorLMSRoutes } from '~/routes';
import { RoutePayload } from '~/models/routes';
import { MentorDashboardNavigationActionData } from '~/constants';
import DashboardSidebarButton from '~/components/molecules/DashboardSidebarButton';

export default function DashboardPage() {
  React.useEffect(() => {
    scrollToTop();
  }, []);

  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSetActiveIndex = (idx: number) => {
    setActiveIndex(idx);
  };

  const handleNavigateLink = (link: string) => {
    navigate(link);
  };

  const showDashboardMentorRoutes = () => {
    let result = null;

    if (mentorLMSRoutes.length > 0) {
      result = mentorLMSRoutes.map((route: RoutePayload) => {
        return (
          <Route key={route.path} path={route.path} element={route?.main()} />
        );
      });
    }

    return result;
  };

  const DashboardNavigation: {
    id: number;
    label: string;
    link: string;
    icon: IconName;
  }[] = [
    {
      id: 0,
      icon: 'home',
      label: 'Trang Chủ',
      link: '/homepage',
    },
  ];

  const rows = MentorDashboardNavigationActionData;

  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        background: Color.white4,
      }}
    >
      <Grid
        sx={{
          background: Color.navy,
        }}
        item
        xs={12}
        md={2}
      >
        <Stack
          sx={{
            position: 'sticky',
            top: '70px',
            zIndex: 9,
            background: Color.white4,
            shadow: 3,
          }}
        >
          <Stack
            sx={{
              transition: 'height 500ms ease',
              borderBottomRightRadius:
                activeIndex === 0 ? MetricSize.small_10 : 0,
              padding: MetricSize.medium_15,
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.regular,
              background: Color.navy,
            }}
          >
            {' '}
          </Stack>
          {rows?.map((item, index) => {
            return (
              <DashboardSidebarButton
                activeIndex={activeIndex}
                index={index}
                item={item}
                onNavigateLink={handleNavigateLink}
                onSetActive={handleSetActiveIndex}
                key={item.id}
              />
            );
          })}
          <Stack
            sx={{
              transition: 'background 200ms',
              borderTopRightRadius:
                activeIndex === rows.length - 1 ? MetricSize.small_10 : 0,
              padding: MetricSize.medium_15,
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.regular,
              background: Color.navy,
            }}
          >
            {' '}
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={10} padding={3}>
        <Routes>{showDashboardMentorRoutes()}</Routes>
      </Grid>
    </Grid>
  );
}
