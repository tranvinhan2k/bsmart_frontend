import { useEffect } from 'react';

import { Grid, Stack, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { useEffectScrollToTop } from '~/hooks';
import globalStyles from '~/styles';
import { Color, MetricSize } from '~/assets/variables';
import { OptionPayload } from '~/models';
import {
  ClassStatusKeys,
  CourseStatusKeys,
  LevelKeys,
} from '~/models/variables';
import ReturnLink from '~/components/atoms/ReturnLink';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import Sidebar from './Sidebar';
import CourseContextProvider from '~/HOCs/context/CourseContext';
import SidebarApproval from './SidebarApproval';
import CourseRoutes from './CourseRoutes';

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
  const navigate = useNavigate();

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
            <Grid item xs={12} md={4} lg={3}>
              <Stack marginRight={2}>
                <Sidebar />
              </Stack>
              <SidebarApproval />
            </Grid>
            <Grid item xs={12} md={8} lg={9} paddingX={4}>
              <CourseRoutes />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </CourseContextProvider>
  );
}
