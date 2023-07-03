import React, { useState } from 'react';

import { Grid, Stack, Typography, Box } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { scrollToTop } from '~/utils/common';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon, { IconName } from '~/components/atoms/Icon';
import { mentorLMSRoutes } from '~/routes';
import { RoutePayload } from '~/models/routes';
import { MentorDashboardNavigationActionData } from '~/constants';
import DashboardSidebarButton from '~/components/molecules/DashboardSidebarButton';
import { image } from '~/constants/image';
import { NavigationLink } from '~/constants/routeLink';

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

  const handleNavigateHomepage = () => {
    navigate(`/${NavigationLink.homepage}`);
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

  const rows = MentorDashboardNavigationActionData;

  return (
    <Grid
      container
      sx={{
        position: 'relative',
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
            top: 0,
            zIndex: 9,
            background: Color.white4,
            shadow: 3,
          }}
        >
          <Stack
            sx={{
              paddingTop: 3,
              background: Color.navy,
            }}
          >
            <Typography
              sx={{
                fontSize: FontSize.small_18,
                fontFamily: FontFamily.bold,
                color: Color.white,
                textAlign: 'center',
              }}
            >
              LMS
            </Typography>
          </Stack>
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
          />
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
          />
          <Stack sx={{ background: Color.navy }}>
            <Stack
              onClick={handleNavigateHomepage}
              sx={{
                position: 'relative',
                margin: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.5s ease',
                background: `${Color.orange}AA`,
                padding: 1,
                backdropFilter: 'blur(2px)',
                borderRadius: MetricSize.small_5,
                fontFamily: FontFamily.light,
                fontSize: FontSize.small_14,
                zIndex: 10,
                color: Color.white,

                ':hover': {
                  background: `${Color.orange}`,
                  backdropFilter: 'blur(0px)',
                  cursor: 'pointer',
                },
              }}
            >
              <Stack
                sx={{
                  position: 'absolute',
                  left: MetricSize.small_10,
                }}
              >
                <Icon name="return" size="small_20" color="white" />
              </Stack>
              <Typography
                sx={{
                  marginLeft: 1,
                }}
              >
                Trở về trang chủ
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={10} padding={3}>
        <Routes>{showDashboardMentorRoutes()}</Routes>
      </Grid>
    </Grid>
  );
}
