import React, { useState } from 'react';

import { Stack, Typography, Drawer, IconButton, Box } from '@mui/material';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { scrollToTop } from '~/utils/common';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { mentorLMSRoutes } from '~/routes';
import { RoutePayload } from '~/models/routes';
import { MentorDashboardNavigationActionData } from '~/constants';
import DashboardSidebarButton from '~/components/molecules/DashboardSidebarButton';
import { NavigationLink } from '~/constants/routeLink';
import DashboardBreadcrumbNavigation from '~/components/molecules/navigations/DashboardBreadcrumbNavigation';
import Button from '~/components/atoms/Button';

export default function DashboardPage() {
  React.useEffect(() => {
    scrollToTop();
  }, []);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
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
        </Stack>
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
          <Stack
            sx={{
              background: Color.navy,
              flex: 1,
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
                transition: 'all 1000ms ease',
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
                  isHover
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
                transition: 'background 1000ms',
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
                  display: isHover ? 'flex' : 'none',
                  position: 'relative',
                  margin: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 1000ms ease',
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
        </Drawer>
        <Stack
          sx={{
            display: { xs: 'none', md: 'flex' },
            marginLeft: '60px',
          }}
        >
          <Stack
            onMouseOut={() => setHover(false)}
            onMouseOver={() => setHover(true)}
            sx={{
              transition: 'all 1000ms ease',
              background: Color.white4,
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 9,
              shadow: 3,
              maxWidth: isHover ? '100%' : '60px',
              height: '100vh',
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
                transition: 'all 1000ms ease',
                borderBottomRightRadius: {
                  xs: 0,
                  md: activeIndex === 0 ? MetricSize.small_10 : 0,
                },
                padding: MetricSize.medium_15,
                fontSize: FontSize.small_18,
                fontFamily: FontFamily.regular,
                background: Color.navy,
              }}
            />
            {rows?.map((item, index) => {
              return (
                <DashboardSidebarButton
                  isHover={isHover}
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
                transition: 'background 1000ms',
                borderTopRightRadius: {
                  xs: 0,
                  md: activeIndex === rows.length - 1 ? MetricSize.small_10 : 0,
                },

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
                  display: isHover ? 'flex' : 'none',
                  position: 'relative',
                  margin: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 1000ms ease',
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
            <Stack
              sx={{
                flex: 1,
                background: Color.navy,
                flexGrow: 1,
              }}
            />
          </Stack>
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
        <DashboardBreadcrumbNavigation />
        <Routes>{showDashboardMentorRoutes()}</Routes>
      </Stack>
    </Stack>
  );
}
